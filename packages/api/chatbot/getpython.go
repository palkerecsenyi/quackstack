package chatbot

import (
	"encoding/json"
	"fmt"
	"os/exec"

	"quackstack.palk.me/api/v2/env"
)

func CallPythonScript(userInput, code string) (map[string]string, error) {
	// Execute the Python script with command-line arguments
	cmd := exec.Command("python3", env.GetChatbotScriptPath(), userInput, code)

	// Get the output from the command
	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, err
	}

	// Parse the JSON output
	var result map[string]string

	err = json.Unmarshal(output, &result)

	if err != nil {
		fmt.Println(string(output), err)
		return nil, err
	}

	fmt.Println(result)
	return result, nil
}
