package config

import (
	"os"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Token string `yaml:"token"`
}

func GetConfig(path string) (cfg Config, err error) {
	f, err := os.Open(path)
	if err != nil {
		return cfg, err
	}
	defer f.Close()

	decoder := yaml.NewDecoder(f)
	err = decoder.Decode(&cfg)
	if err != nil {
		return cfg, err
	}
	return cfg, nil
}
