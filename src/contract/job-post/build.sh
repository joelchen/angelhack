#!/bin/bash
cargo build --release --features generate-api-description --target=wasm32-unknown-unknown --verbose
wasm-build target job-post --target-runtime=substrate --final=job-post --save-raw=./target/job-post-deployed.wasm --target wasm32-unknown-unknown
