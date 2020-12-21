#!/bin/sh
server=washup@103.147.186.58

rsync -auvr ./dist/ $server:/var/www/insee-admin-client/html
#rsync -auvr --exclude="flatc" --exclude="*.bin" --exclude="*.json" $local_dir/$project/public $server:$server_dir/$project/
