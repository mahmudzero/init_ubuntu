#!/bin/bash
function catch_sigkill() {
	echo "Caught ctrl-c... performing cleanup"
	echo "Clean up done..."
	exit 2
}

trap "catch_sigkill" 2

echo "Starting program..."

yes

echo "end of program"
