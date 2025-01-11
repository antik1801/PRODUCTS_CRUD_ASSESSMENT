/* eslint-disable @typescript-eslint/no-unused-vars */
import { TProducts } from "./products.interface";
import crypto from "crypto";

export const generateProductCode = async (payload: TProducts) =>{
    const productName = payload.name.toLowerCase(); // Normalize the name into lower case
    const longestSubstring : { substring: string; start: number; end: number}[] = [];
    let currentSubstring = "";
    let startIndex = 0;
    for(let i=0; i<productName.length; i++)
    {
        if(currentSubstring === "" || productName[i] > productName[i-1])
        {
            if(currentSubstring === "") startIndex = i;
            currentSubstring += productName[i];
        }
        else {
            if(longestSubstring.length === 0 || currentSubstring.length > longestSubstring[0].substring.length)
            {
                longestSubstring.length = 0;
                longestSubstring.push({
                    substring: currentSubstring,
                    start: startIndex,
                    end: i - 1
                });
            }
            else if(currentSubstring.length === longestSubstring[0].substring.length)
            {
                longestSubstring.push({
                    substring: currentSubstring,
                    start: startIndex,
                    end: i-1
                })
            }
            currentSubstring = productName[i];
            startIndex = i;
        }
    }
    // Handle the last substring 
    if(longestSubstring.length === 0 || currentSubstring.length > longestSubstring[0].substring.length)
    {
        longestSubstring.length = 0;
        longestSubstring.push({
            substring: currentSubstring,
            start: startIndex,
            end: productName.length - 1
        });
    }
    else if(currentSubstring.length === longestSubstring[0].substring.length)
    {
        longestSubstring.push({
            substring: currentSubstring,
            start: startIndex,
            end: productName.length - 1
        });
    }
    

    const concatenatedSubstrings = longestSubstring.map(({ substring }) => substring).join("");
    const firstStartIndex = longestSubstring[0].start;
    const lastEndIndex = longestSubstring[longestSubstring.length - 1].end;
  
    const productCodeWithoutHash = `${firstStartIndex}${concatenatedSubstrings}${lastEndIndex-1}`;

    const hash = crypto.createHash("sha256").update(productName).digest("hex")
    const shortHash = hash.substring(0,8);


    const productCodeWithHash = `${shortHash}-${productCodeWithoutHash}`;
    // console.log(productCodeWithHash);
    return productCodeWithHash;
    
}