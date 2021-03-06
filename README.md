=== Installing the software ===
We need to install some libraries to run the script that looks at the
BlueStacks pixels and sends then to the piotools.

Download and install python 3.6.7
`https://www.python.org/downloads/`


Install pip
`https://phoenixnap.com/kb/install-pip-windows`

Now we need to install git.
`https://git-scm.com/download/win`


Then in the Command Prompt run
`pip install win32gui`
`pip install requests`

Now we need to tell Chrome to allow itself to communicate with the proxy server
that communicates with the Warren server.
 
Go to `piotools.com/ofc_v2` in chrome

Click the lock to the left of the address bar

Click `Site settings`

Scroll down to `Insecure Content` and switch it from the default to `Allow`


Install the actual software:

open Command Prompt

run `git clone https://github.com/weston/PIOTools`

=== Running the software ===	
Open BlueStacks and pppoker

Open the "Command Prompt"

`cd PIOTools`

`cd ScreenScraper`

`python main.py`


If it is working, it should resize the pppoker window and move it to the side of your screen.
