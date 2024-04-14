package chatbot

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
	"quackstack.palk.me/api/v2/env"
	"quackstack.palk.me/api/v2/files"
	"quackstack.palk.me/api/v2/github"
)

type ChatMessage struct {
	FromBot bool   `json:"from_bot"`
	Content string `json:"content"`
}

type ChatRouteRequest struct {
	Repo     string        `json:"repo"`
	FileName string        `json:"file_name"`
	Messages []ChatMessage `json:"messages"`
}

func ChatRoute(c *gin.Context) {
	var req ChatRouteRequest
	err := c.ShouldBind(&req)
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	userId, err := github.GetUserId(c)
	if err != nil {
		c.String(http.StatusUnauthorized, err.Error())
		return
	}

	fileBody, err := files.GetFileContentsPorcelain(c.Request.Context(), userId, req.Repo, req.FileName)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	oaiMessages := []openai.ChatCompletionMessage{
		{
			Role:    openai.ChatMessageRoleSystem,
			Content: fmt.Sprintf("You are helping with programming help for a GitHub Actions CI/CD pipeline pretending you are a duck. Give programmatic help with the YAML files provided by the user in an IDE. These files are specific to GitHub Actions. Be reassuring and concise. Use duck puns when appropriate. Here is the code: ```yaml\n%s\n```", fileBody),
		},
	}
	for _, msg := range req.Messages {
		oaiMsg := openai.ChatCompletionMessage{}
		if msg.FromBot {
			oaiMsg.Role = openai.ChatMessageRoleAssistant
		} else {
			oaiMsg.Role = openai.ChatMessageRoleUser
		}

		oaiMsg.Content = msg.Content
		oaiMessages = append(oaiMessages, oaiMsg)
	}

	oaiClient := openai.NewClient(env.GetOpenAIKey())
	resp, err := oaiClient.CreateChatCompletion(
		c.Request.Context(),
		openai.ChatCompletionRequest{
			Model:    openai.GPT3Dot5Turbo,
			Messages: oaiMessages,
		},
	)

	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	responseMessage := resp.Choices[0].Message.Content
	c.String(http.StatusOK, responseMessage)
}
