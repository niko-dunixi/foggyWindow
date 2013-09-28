Welcome to the repository for Raging Dipsticks!
.



I am not sure if this is the file we are supposed to fork/edit, so hopefully I don't mess something up :)

*Online Tank Wars Arena*

Description: 
	One main, large level allowing people to join with several different options for tanks (large tanks, strong but slow; small tank - weak but quick; medium tank - medium strength, etc.. ). Upon logging into the server via a client, you are presented with your choice of tank, and then placed in one of two teams.


Goals: 
	have fun, shoot other tanks and see them go flying/blow up, obtain points, etc. (add special effects such as fire, fireballs shooting out of tank, etc..) There could be game modes, but we could also leave it open ended where one would just login for the enjoyment of blowing up other tanks/players. Something that would get others hooked on it is if we had a tank store you could buy weapon upgrades to your own tank, from the points that are obtained from blowing up other tanks. *edit* Another fun cool idea would be a free for all, capture the hill kind of game.

What we would need - the specifics:

    * A 3D engine would be a must, with a server able to connect to. We would need to learn some skills such as 3D modeling, how server/client interaction works, etc..

    * There is a great free 3D IDE called jMonkeyEngine (http://jmonkeyengine.org/). (feel free to search you tube for other videos)
    * It is java based, so it should be independent of Operating systems (should work on mac, Linux, windows, etc...) and it uses OpenGL. Built into jMonkey is a map editor to create a map of your liking, water effects, etc.. But there will be a learning curve with this. (So far in my free time I've been able to place a object in a 3d field..)
    * Blender (http://www.blender.org/) is used/would be used as the 3D modeling tool to create the tanks.
    * A website would be needed, to invite others to play. A standalone server to allow others to connect to (I can provide this, along with a url from no-ip.org)

*EDIT*

    * Sockets would be necessary to connect clients to a server, and from the server, blast the location, score, data, etc.. of all users to each client, placing the tank in the correct position on each client machine.
    * Google has a great java library called gson, which converts a java type to json, and is able to send that down a line over a socket, then converted back into a type. I am not sure how quick this is on sending data, but could be bench marked pretty easily. Extremely frequent updates would have to occur to make other players on the map appear in real time, but there could/would have to be some sort of lag algorithm in place to compensate for latency, and allow smooth motions of enemy tanks.
    * Using custom socket information, in my belief, would be more efficient then running a glassfish server/rest client as it would remove a lot of overhead. Multi-threading is allowed while using glassfish/rest however there is a lot of overhead that could be removed if we build a plan jar for the server (in my belief). Plus we could learn about sockets and how they work :)
    ServerUml.png
    * Socket information can be found here (http://docs.oracle.com/javase/tutorial/networking/sockets/clientServer.html). a Stack Overflow example can be found here (http://stackoverflow.com/questions/4615958/make-a-client-server-java-application)
    * Depending on the speed information can be blasted out from the server would determine the max amount of clients able to be connected to the server.
    * Most of the processing would preferably be done per client. Instead of having the server keep track of location, explosions, etc, the client would calculate that information, and send that information to the server to be blasted out to the other connected clients.

*Edit again*
    
    * Some addtional information on networking, jMonkey has a built in network framework called SpiderMonkey (http://jmonkeyengine.org/features/utilities/ half way down the page) It has great tutorials that are easy to follow.
