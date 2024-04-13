package chatbot

import (
	"encoding/json"
	"fmt"
	"os/exec"
)

func CallPythonScript(userInput, code string) (map[string]string, error) {
	// Execute the Python script with command-line arguments
	cmd := exec.Command("python", "chatbot.py", userInput, code)

	// Get the output from the command
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("%s", err)
		return nil, err
	}

	// Parse the JSON output

	var result map[string]string

	err = json.Unmarshal(output, &result)
	if err != nil {
		fmt.Println("Result from Python script:", err)
		return nil, err
	}
	fmt.Println("Nothing returned")
	return result, nil
}
