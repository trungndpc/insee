
local_dir=./
server=stackops@61.28.229.63

rsync -a $local_dir/dist/ $server:/var/www/admin.nhathau.insee.com.vn/html
