#!/bin/bash

# Just pass the original .png image as the only parameter to this script.
SOURCE="$1"
BASE=`basename "${SOURCE}" .png`

convert "${SOURCE}" -thumbnail 16x16 "public/icons/16.png"
convert "${SOURCE}" -thumbnail 19x19 "public/icons/19.png"
convert "${SOURCE}" -thumbnail 32x32 "public/icons/32.png"
convert "${SOURCE}" -thumbnail 38x38 "public/icons/38.png"
convert "${SOURCE}" -thumbnail 48x48 "public/icons/48.png"
convert "${SOURCE}" -thumbnail 64x64 "public/icons/64.png"
convert "${SOURCE}" -thumbnail 64x64 "public/icons/128.png"

