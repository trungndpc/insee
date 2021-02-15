
local_dir=./
server=stackops@61.28.229.63

rsync -a $local_dir/dist/ $server:/var/www/admin-nt.insee.udev.com.vn//html

