﻿import applicationModule = require("application");

import serviceModule = require("./utils/service");
import viewsModule = require("./utils/views");

applicationModule.mainModule = viewsModule.Views.viewReport;

applicationModule.start();
