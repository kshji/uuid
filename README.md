# Uuid - uuidv7

uuidv7 and uuidv4 tools: shellscript, Go, Javascript, Postgresql, C

This is collection to use uuidV7.

UuidV7 and other uuid-based ones include, for example, the fact that the prefix is a timestamp,
which makes indexing enjoyable and the timestamp does not need to be separately stored.
It can be used for sorting just like SERIAL type keys.


  * [IETF](https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html)
  * [Why uuidv7 is better ...](https://itnext.io/why-uuid7-is-better-than-uuid4-as-clustered-index-edb02bf70056)
  * [Good bye integers, welcome uuids](https://buildkite.com/blog/goodbye-integers-hello-uuids)
  * [Kvelakur C-language version using SSL Rand -uuidv4](https://gist.github.com/kvelakur/9069c9896577c3040030)

## Ksh shellscript uuidv7

  * [My ksh shellscript to generate uuidV7](https://github.com/kshji/ksh/blob/master/Sh/uuidv7.sh)

## Bash / Ksh uuidv4

```bash
# using cmd uuidgen
uuidgen

# using kernel file
read uuid < /proc/sys/kernel/random/uuid
#uuid=$(cat /proc/sys/kernel/random/uuid)
echo $uuid

# using OpenSSL rand
uuid=$(openssl rand -hex 16)
echo ${uuid:0:8}-${uuid:8:4}-4${uuid:12:3}-${uuid:16:4}-${uuid:20:12}
```

## Postgresql uuidv7

  * [My Postgresql function to generate uuidV7](https://github.com/kshji/postgresql)

## Go uuidv7

  * [My version to generate uuidv7](https://github.com/kshji/go/tree/master/uuid7)
  * [Standalone server to return uuidv7](https://github.com/kshji/go/tree/master/uuidv7server)

## Javascript uuidv7

Based on the JS versions published by [Fabio Lim](https://gist.github.com/fabiolimace).
Uuidv4 and uuidv7 are really elegant solutions. Quite easily adaptable to other languages as well.

   * [My html test page](https://github.com/kshji/uuid/blob/main/uuidv7.html)

```javascript
const v4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.trunc(Math.random() * 16);
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const v7 = () => {
  return 'tttttttt-tttt-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.trunc(Math.random() * 16);
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).replace(/^[t]{8}-[t]{4}/, function() {
    const unixtimestamp = Date.now().toString(16).padStart(12, '0');
    return unixtimestamp.slice(0, 8) + '-' + unixtimestamp.slice(8);
  });
}

console.log(v4());
console.log(v7());
```

Look file uuid.js and uuidv7.js more uuid versions. Source [Fabio Lim](https://gist.github.com/fabiolimace).

