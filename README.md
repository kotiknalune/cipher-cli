## Caesar's Cipher CLI Tool

CLI Tool to transform inputs using [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher).

#### Installation

1. Clone or download repository
2. Run ```npm install``` to download required packages

#### Usage

```bash
$ node caesar_cipher_cli/index.js --action <encode|decode> --shift <number> [--input <input>] [--output <output>]
```
| Option | Description |
| :------ |---------- |
|*-s, --shift <number>*|shift value|
|*-a, --action \<encode\|decode>*|action to perform (encode/decode)|
|*-i, --input \<input>*|input file (if none then stdin is used)|
|*-o, --output <output>*|output file (if none then stdout is used)|

**Usage example:**

```bash
$ node caesar_cipher_cli/index.js -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node caesar_cipher_cli/index.js --action encode --shift 7 --input original.txt --output encoded.txt
```

```bash
$ node caesar_cipher_cli/index.js --action decode --shift 7 --input decoded.txt --output original.txt
```

**Result example:**

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
