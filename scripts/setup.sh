#!/bin/zsh

# shellcheck disable=SC2164
pushd .git/hooks
  ln -s -f ../../scripts/hooks/pre-push .
popd


