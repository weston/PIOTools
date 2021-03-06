# PIOTools Installation Instructions

## 1. Download and install some stuff

* Download and install python 3.6.7 `https://www.python.org/downloads/`
* Download and install pip `https://phoenixnap.com/kb/install-pip-windows`
* Download and install git `https://git-scm.com/download/win`

To verify that you have succesfully installed everything, open Command Prompt and type in `python --version` and you should see exactly this:
```
C:\Users\wmizu>python --version
Python 3.6.7
```

Do the same with `git --version` and `pip --version`
```
C:\Users\wmizu>git --version
git version 2.30.1.windows.1

C:\Users\wmizu>pip --version
pip 10.0.1 from c:\users\wmizu\appdata\local\programs\python\python36\lib\site-packages\pip (python 3.6)
```

If your output differs slightly for these ones, that should be fine. As long as it doesn't say something like:
```
'pip' is not recognized as an internal or external command,
operable program or batch file.
```

## 2. Allow Chrome to talk to the external server
piotools.com communicates with a proxy server over http, which is by default disallowed (in favor of https). To allow Chroms to communicate over http on piotools.com
* Go to piotools.com
* Click on the lock to the left of the address bar and click `Site Settings`
* Scroll down to `Insecure Content` and make sure that it is set to `Allow`

## 3. Download and install the screen scraper.
* Open the Command Prompt again and run `git clone https://github.com/weston/PIOTools`
* `cd PIOTools/ofc_v2/ScreenScraper`
* pip install -r requirements.txt

TODO: Include instructions for a virtualenv (optional)

## 4. Run the screen scraper.
* Close and reopen the Command Prompt
* Open pppoker on BlueStacks
* `cd PIOTools/ofc_v2/ScreenScraper`
* `python main.py`
