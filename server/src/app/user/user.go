package user

import (
	"bufio"
	"errors"
	"fmt"
	"os"
)

func CheckContact(c string) error {
	f, err := os.OpenFile("users.txt", os.O_RDONLY|os.O_CREATE, 0666)
	defer f.Close()

	if err != nil {
		return err
	}
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		t := scanner.Text()
		if t == c {
			return errors.New("Contact information already submitted")
		}
	}
	if err := scanner.Err(); err != nil {
		return err
	}
	err = addContact(c)
	if err != nil {
		return err
	}
	return nil
}

func addContact(c string) error {
	f, err := os.OpenFile("users.txt", os.O_WRONLY|os.O_APPEND, 0666)
	defer f.Close()

	if err != nil {
		return err
	}
	_, err = f.WriteString(fmt.Sprintf("%s\n", c))

	if err != nil {
		return err
	}
	return nil
}
