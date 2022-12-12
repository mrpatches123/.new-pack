# .new-pack

node js bedrock edition scripting api pack generator

you can but the files in the behavior pack folder if you want.

# development_behavior_packs instructions

open your com.mojang folder in vsc and open it in the intergrated terminal

```C:\Users\%UserProfile%\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang```

(make sure you install git and you can change development_behavior_packs to any pack folder in your com.mojang) 
run:

```
git init
git remote add origin https://github.com/mrpatches123/.new-pack.git
git pull origin master 
```


now open development_behavior_packs in the intergrated terminal
run: 

```npm run new-pack --pName="Pack-Name" --pDesc="1.0.0 - aphalpke"```



#Docs

```all options must be in quotes and you dont have to have them```
--pName (Pack Name) default?= "new-pack"

  ```npm run new-pack --pName="Pack-Name"```
  
  
--fName (folder Name) default?= "new-pack"

  ```npm run new-pack --fName="folder-Name"```
  
  
--pDesc (Pack Desciption) default?= "1.0.0"

  ```npm run new-pack --pDesc="jwkdkjwdwjwdjkwdjwdj"```


--pEntry (Pack Scripting Entry) default?= "index.js"

  ```npm run new-pack --pEntry="main.js"```
  
  
--pModules (Pack Scripting Modules) default?= "su"

  a - "@minecraft/server-admin"
  
  s -  "@minecraft/server"
  
  u -  "@minecraft/server-ui"
  
  g -  "@minecraft/server-gametest"
  
  n -  "@minecraft/server-net"
  
  ```npm run new-pack --pModules="sun"```
  
  
--pVer (Pack Scripting Version) default?= "b"

  s - Stable - All "1.0.0-beta" but server is "1.0.0"
  
  b - Beta - All "1.0.0-beta" but server is "1.1.0-beta"
  
  p - Preview - All "1.0.0-beta" but server is "1.1.0-beta"
  
   ```npm run new-pack --pVer="p"```
   


