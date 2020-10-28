# Projeto agro

git pull origin master  
git push origin master  
git commit -m "texto" --amend (usa o mesmo commit)  
git add --all  ->todas adições e exclusões  
git rm -rf node_modules/ --cached  
git diff  
git diff --staged  
git log --name-status  
git log --pretty=oneline  
git log --abbrev-commit  
git log -p (mostra os commits detalhados com as alterações)  
git branch  
git branch dev  
git checkout dev  
git merge <branch name> (junta os arquivos da branch name na branch atual)  
git checkout -b <name> (cria e ja troca pra branch criada)  
git branch -m <new name>  
git branch -D <name of branch> (deleta branch)  
git checkout --orphan site (cria branch em branco)  
git remote add <origin> <repository>  
git remote add origin https://github.com/tauan/agro.git  
git remote -v  
git push <origin> <branch>  
git merge --abort  
git diff -w  
git checkout <name file>  
git checkout <commit> (volta no tempo pro commit escolhido)  
git stash (ignora temporariamente as modificações)  
git stash list (lista as alterações ignoradas)  
git stash apply (recupera alterações)  
git stash drop <number of stash> / git stash drop stash@{0}  
git log --pretty=format:"%h - %an"   
(  
	colocar opções dentro das aspas, sendo elas:   
	%H - commit hash, %h Abbreviated commit hash,   
	%T - Tree hash, %t - abbreviated tree hash,   
	%P - parent hash, %p abbreviated parent hash,   
	%s - subject  
	%an - author name, %ae - Author email  
	%ad - author date, %ar - author date relative,  
	%cn - Commiter name, %ce - commiter email,  
	%cd - Commiter date, %cr - commiter date relative  
)   
git remote set-url origin "url"  
git rebase master
