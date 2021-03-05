
local_dir=./
server=stackops@61.28.229.63

# rsync -a $local_dir/build/ $server:/var/www/nhathau.insee.com.vn/html
rsync -a $local_dir/app/resources/fonts/ $server:/var/www/nhathau.insee.com.vn/html/fonts
