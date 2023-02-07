#!/bin/bash
set -e

watchman watch-del-all
watchman shutdown-server
yarn mobile
