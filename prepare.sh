#!/bin/bash
# Vendored shared packages
mkdir -p node_modules/@magicwrxtools
for pkg in auth-tool stripe-tool theme-manager block-system; do
  if [ -d "vendor/$pkg" ]; then
    ln -sfn "../../vendor/$pkg" "node_modules/@magicwrxtools/$pkg"
  fi
done
