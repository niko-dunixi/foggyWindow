Welcome to the repository for Raging Dipsticks!
<<<<<<< HEAD
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
    
    * Some additional information on networking, jMonkey has a built in network framework called SpiderMonkey (http://jmonkeyengine.org/features/utilities/ half way down the page) It has great tutorials that are easy to follow.

Also, I vote for the Encryption chrome extension and also my own idea
=======

=======
Online golf game

Basic Features: Multi-players interface, the user will be able to manipulate a golf ball (solid-filled circle) on an image background using a physics engine commensurate with Dipsticks’ resources. Once the center pixel of the ball passes over a designated area of pixels representing the hole, the user completes the course. 

At minimum, the user will be able to control the ball’s direction and trigger its release. Magnitude may be fixed, along with the ball’s angle of ricochet and rate of deceleration. A set of boundaries will be defined against which the ball will “bounce” following a collision. Dipsticks may use the same frame of boundaries with an alternating background image for multiple fairways. 

the user will be able to control the magnitude of the ball’s motion, and its collisions will follow some basic trigonometric rules for Newtonian mechanics for greater realism. Different boundary frames may be set for different courses. A score card may be implemented.

*Chrome RSA/AES Extension* - Paul Baker

Here is a quick rundown of the structure of the Chrome extension. Basically chrome has a very simple execution for extensions. All chome extensions are are little more than a collection of JS and HTML files. For processing things like communicating with the browser's local storage we will implement what is called an "event page" (http://developer.chrome.com/extensions/event_pages.html). This is where the magic of encryption and decription will happen, our algorithms will be stored here and executed when needed. For managine our list of public keys, we will implement an "options page" (http://developer.chrome.com/extensions/options.html).

The part where we actually type the message can be implemented in a couple ways and we can decide on some of the following options.
	-Context Script. This is what I believe would be the most desireable option. We would specify every page that we did want to have the script enabled on, and when we came across the page Chrome would examen the URL compared to the the list of our pre-given Urls and then inject script accordingly. Essentially we could automatically inject an additional button into any page we wanted and allow the user to use that button to toggle the form for encryption/decryption.
	-Inject code directly into the page and manage via Chrome API. Personally I find this to be the least desireable of the options. If we implement it this way we can insert this form onto any page we desire at any given time, however accessing chrome API's and communicating with our event page will be a much more involved process.
	-No script injection. This would be the easiest, but least dynamic. Chrome would stick our extensions button along side the other buttons in the toolbar and then when the user clicked it, it would open a new page/tab where we had our form all by itself. We can ensure that it would only one instance at a time by specifying a "name" parameter. (It would just make a javascript call to the method window.open(url, name)) This can be used in tandem with either of the previous two methods.

I'm going to describe a little more in depth what the process of running this extension would entail. Basically the gist of it. We would store all the public keys we have in local storage (in google chrome this is given to every website and chrome extension, so it is very easy to implement) the private key however has to have additional procautions to prevent leakage. We give the user two options, they can either store it themselves and be responsible for keeping it secure (using a program such as truecrypt or KeePass) or they can save it in local storage as well. When they save it in local storage we will have to encrypt the private key itself (I thought of this next part during our class dissucssion).

What we will do to keep the private key safe, is to encrypt it via AES. This allows the user to encrypt their private key (which will be a very large prime number) with a password that they can easily remember. We take the password they provide to us, and we hash it into a number. This number is then given to a random object as a random seed. From there we provide this random object to our AES algorithm to generate another AES key to encrypt our RSA private key. Executing in this method will ensure that the private key is *more secure. (I say this because it is always possible to brute force an AES key, however it is still not practical: http://www.theinquirer.net/inquirer/news/2102435/aes-encryption-cracked)

When the user wishes to encrypt their message they will be prompted with a message telling them to enter their pwd if they have stored their RSA private key locally, or allow them to enter it if they have taken on the responsiblity themselves.

Verification - When we encrypt our message with the recipient's RSA public key, we digitally sign the message with our RSA public key. This allows the recipient to ensure that only we are sending the actual message and not someone else.
>>>>>>> upstream/master
