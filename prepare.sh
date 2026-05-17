#!/bin/bash
# Vendored shared packages — see vendor/README.md
mkdir -p node_modules/@magicwrxtools
for pkg in auth-tool stripe-tool theme-manager; do
  if [ -d "vendor/$pkg" ]; then
    ln -sfn "../../vendor/$pkg" "node_modules/@magicwrxtools/$pkg"
  fi
done
