#/usr/local/bin/awsh
# using cmd uuidgen
uuidgen

# using kernel file
read uuid < /proc/sys/kernel/random/uuid
#uuid=$(cat /proc/sys/kernel/random/uuid)
echo $uuid

# using OpenSSL rand
uuid=$(openssl rand -hex 16)
echo ${uuid:0:8}-${uuid:8:4}-4${uuid:12:3}-${uuid:16:4}-${uuid:20:12}
