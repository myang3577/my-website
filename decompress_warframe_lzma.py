import lzma

import requests


def fix():
    response = requests.get(
        "http://content.warframe.com/PublicExport/index_en.txt.lzma"
    )
    data = response.content
    byt = bytes(data)
    length = len(data)
    stay = True
    while stay:
        stay = False
        try:
            decompress_lzma(byt[0:length])
        except lzma.LZMAError:
            length -= 1
            stay = True

    return decompress_lzma(byt[0:length])


# FROM: https://stackoverflow.com/a/37400585/15041587
def decompress_lzma(data):
    results = []
    while True:
        decomp = lzma.LZMADecompressor(lzma.FORMAT_AUTO, None, None)
        try:
            res = decomp.decompress(data)
        except lzma.LZMAError:
            if results:
                break  # Leftover data is not a valid LZMA/XZ stream; ignore it.
            else:
                raise  # Error on the first iteration; bail out.
        results.append(res)
        data = decomp.unused_data
        if not data:
            break
        if not decomp.eof:
            raise lzma.LZMAError(
                "Compressed data ended before the end-of-stream marker was reached"
            )
    return b"".join(results)


a = fix()
a = a.decode("utf-8")

print(a)
