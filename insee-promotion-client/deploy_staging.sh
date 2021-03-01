
local_dir=./
server=washup@103.147.186.58

rsync -a $local_dir/build/ $server:/var/www/insee-client/html
# rsync -a $local_dir/app/resources/fonts/ $server:/var/www/insee-client/html

