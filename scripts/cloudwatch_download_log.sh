aws logs get-log-events --log-group-name $1 --log-stream-name $2 --query 'events[*].[message]' --output text | sed 's/\\n/ /g;s/\\//g;s/  */ /g'
