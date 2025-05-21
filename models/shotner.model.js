import { readFile, writeFile } from "fs/promises"
import path from "path"


// path of JSON sile
const DATA_file = path.join("data","links.json")

export const loadLinks = async () => {
  try {
    const data = await readFile(DATA_file, "utf-8");
         return JSON.parse(data)
        } catch (error) {
      if(error.code === "ENOENT"){
            await writeFile(DATA_FILE,`${JSON.stringify({})}`)
            return {}
             }

             throw error
  }
};

export const saveLinks = async(links)=>{
await writeFile(DATA_file,JSON.stringify(links))
}