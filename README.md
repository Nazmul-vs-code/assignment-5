1. var, let, and const (The Storage Containers)

Var is a global and old variable setter, nowadays, it is not used by modern developer, because, it has some bugs.

let defines a variable and it is mutable, we use this when we need to change some variable's values.

const defines varible which is immutable.

2. Ans : 
   1. It's basically a magic wand that "unpacks" an array or object. I use it when I need to copy items into a new list or combine two objects together without manually looping through everything.

3. Ans:
   1. forEach() just does a job for every item (like logging to the console), 
   2. filter() picks out only the items you want (like only "open" issues), 
   3. and map() transforms every item into something else (like turning a data object into an HTML card). The main thing to remember is that map and filter give you a brand new array back, while forEach returns nothing.

4. Ans:
   1. Instead of typing out the word function every time, we use the "fat arrow" => which makes our fetch chains and loops look way cleaner and much easier to read.
   
5. Ans:
   1. They’re those backticks (`) we use instead of quotes to build strings. They let us drop variables directly into our HTML code using ${variable} so we don't have to deal with those messy + signs and extra spaces anymore.
   2. But, for a security researcher, this is a nice backdoor to get  a security missconfiguration, caz, we can't trust on any of the user input, if `` is used on a serch option, an attacker can input like this ${alert(window.location=http://attacker.com)} and this may lead a security issue, attacker will send the url to victim and victim will understan this is nothing but a search, but they might be caugh by attacker, even ,,  attacker can use this on login functionality and can get session data like ${alert(document.cookie)}, by this, attacker will hijack user session by connecting with his smtp server. This is typically harmful if the userinput is not sanatized, encooded, escaped well.