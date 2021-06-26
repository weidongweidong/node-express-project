#指定继承 node 的镜像，然后我们再接下来的容器中，才能使用node
FROM node:8.9.0
# 创建一个工作用的目录，就是一个新文件夹 放项目
RUN mkdir -p /data/api
# 将当前目录下的项目文件都 拷贝到那个新的文件中去， 
COPY ./  /data/api
# 指定工作目录， 就是cd 进入到这个目录中去 
WORKDIR /data/api
#执行下 npm install ,  
#注意！ RUN 和 CMD 都是执行的意思， 但是 RUN 可以执行多次， cmd 只能执行一次 
#简单来说:RUN命令在image文件的构建阶段执行,执行结果会打包进image文件;CMD命令则是在容器启动后执行.另外一个Dockerfile文件只能包含多个RUN命令,但只能包含一个CMD命令,
#注意:制定了CMD命令后,docker container run命令就不能附加命令了,比如前面的/bin/bash,否则,它会覆盖CMD命令
# CMD不同于RUN，CMD用于指定在容器启动时所要执行的命令，而RUN用于指定镜像构建时所要执行的命令。
RUN npm install -g cnpm -registry=https://registry.npm.taobao.org
RUN cnpm install
# 对我们指定的shell文件进行权限分配， 让它可读可写可执行
RUN chmod a+x /data/api/shell.sh
# 修改docker时区， 让容器里和我们的时区处于一致， 
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
# 暴露接口
EXPOSE 3001
# CMD 执行shell文件， 里面都是启动容器后执行的命令
CMD ./shell.sh dev dev


