# BugAlertsUI

## Overview

This project is a part of the BugAlerts UI project. This frontend system is developed using ReactJS and serves as the frontend user interface. To enable seamless interaction between these components, several application programming interfaces (APIs) have been implemented in the backend and integrated into the frontend. 

Below are the instructions to set up and run the project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- BugAlertsAPI (https://github.com/manoaj/BugAlertsAPI/)
- Node.js with npm (https://nodejs.org/)
- React: "^17.0.2"
- Homebrew (for macOS users)

## Installation

### Install React

```
npm install --global react@"^17.0.2"
```

### Clone BugAlertsUI

```
git clone https://github.com/manoaj/BugAlertsUI.git
```

### Install Packages

```
npm install --save --legacy-peer-deps
```

## Usage

1. Install and run the BugAlertsAPI by following the instructions at https://github.com/manoaj/BugAlertsAPI/.
2. Make sure the BugAlertsAPI is running.
3. Navigate to the BugAlertsUI directory.
```
cd BugAlertsUI
```
4. Run the frontend application using:

```
npm start
```

The application should now be accessible at [http://localhost:3000](http://localhost:3000).

To run it as a background process:

```
npm start &
```

## Troubleshooting

If you encounter any issues during the installation or setup process, please check the following:

- Ensure the BugAlertsAPI is running.
- Confirm that Node.js and npm are installed correctly.
- Double-check that the required packages are installed using `npm install`.

If you still face problems, please [open an issue](https://github.com/your-username/BugAlerts_Frontend/issues) on GitHub.
