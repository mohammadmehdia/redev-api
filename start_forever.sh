forever stopall
forever stopall
forever stopall
rm -vf out.log
rm -vf error.log
forever start -o out.log -e error.log app.js
