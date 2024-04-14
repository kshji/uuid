const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.trunc(Math.random() * 16);
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const uuidv7 = () => {
  return 'tttttttt-tttt-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.trunc(Math.random() * 16);
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).replace(/^[t]{8}-[t]{4}/, function() {
    const unixtimestamp = Date.now().toString(16).padStart(12, '0');
    return unixtimestamp.slice(0, 8) + '-' + unixtimestamp.slice(8);
  });
}

function bigRandom(bits) {
  // IEEE-754 mantissa: 52 bits
  if (bits > 52) { bits = 52 };
  // `Math.random()` is not cryptographically secure
  return BigInt(Math.floor(Math.random() * 2 ** bits));
}

function toUUIDString(bignum) {
    const digits = bignum.toString(16).padStart(32, "0");
    return `${digits.substring(0, 8)
          }-${digits.substring(8, 12)
          }-${digits.substring(12, 16)
          }-${digits.substring(16, 20)
          }-${digits.substring(20, 32)}`;
}

// UUIDv4 (Random)
function uuid4() {
  return toUUIDString(
    bigRandom(48) << 80n | // Random A
    (0x4n << 76n)        | // Version
    bigRandom(12) << 64n | // Random B
    (0b1n << 63n)        | // Variant
    bigRandom(14) << 48n | // Random C
    bigRandom(48)          // Random C
  );
}

// UUIDv7 (Time+Random)
function uuid7() {
  let milli = Date.now()
  return toUUIDString(
    BigInt(milli) << 80n | // Time
    (0x7n << 76n)        | // Version
    bigRandom(12) << 64n | // Random A
    (0b1n << 63n)        | // Variant
    bigRandom(14) << 48n | // Random B
    bigRandom(48)          // Random B
  );
}


function hex(number, len) {
    return number.toString(16).padStart(len, '0');
}

function random(bits) {
    // IEEE-754 mantissa: 52 bits
    if (bits > 52) { bits = 52 };
    // `Math.random()` is not cryptographically secure
    return Math.floor(Math.random() * Math.pow(2, bits));
}

// UUIDv4 (Random)
function uuid4v0() {

    let uuid = "";

    // generate random chars
    uuid += hex(random(32), 8);
    uuid += "-";
    uuid += hex(random(16), 4);
    uuid += "-";
    uuid += hex(random(16), 4);
    uuid += "-";
    uuid += hex(random(16), 4);
    uuid += "-";
    uuid += hex(random(48), 12);

    // version and variant
    uuid = uuid.split('');
    uuid[14] = '4';
    uuid[19] = ['8', '9', 'a', 'b'][random(2)];
    uuid = uuid.join('');

    return uuid;
}





// UUIDv7 (Time+Random)
function uuid7v0() {

    let uuid = "";

    // generate time chars
    let milli = (new Date()).getTime();
    let time = hex(milli, 12);

    // cat time and random chars
    uuid += time.substring(0, 8);
    uuid += "-";
    uuid += time.substring(8, 12);
    uuid += "-";
    uuid += hex(random(16), 4);
    uuid += "-";
    uuid += hex(random(16), 4);
    uuid += "-";
    uuid += hex(random(48), 12);

    // version and variant
    uuid = uuid.split('');
    uuid[14] = '7';
    uuid[19] = ['8', '9', 'a', 'b'][random(2)];
    uuid = uuid.join('');

    return uuid;
}


