﻿import applicationModule = require("application");
import { EventData } from "data/observable";
import specialPropertiesModule = require("ui/builder/special-properties");
import { Visibility } from "ui/enums";
import { ListView, ItemEventData } from "ui/list-view";

import serviceModule = require("./shared/service");
import viewsModule = require("views");
import navigationModule = require("navigation");

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
specialPropertiesModule.registerSpecialProperty("link", (instance, propertyValue) => {
    if (instance instanceof ListView) {
        var listView = <ListView>instance;
        listView.on("itemTap", (args: ItemEventData) => {
            navigationModule.navigateById(propertyValue, {
                item: args.view.bindingContext,
                context: (<any>instance).linkContext
            });
        });
    }
    else {
        instance.on("tap", (args: EventData) => {
            navigationModule.navigateById(propertyValue, {
                context: (<any>instance).linkContext
            });
        });
    }
});

applicationModule.cssFile = "./app.css";
applicationModule.resources = {
    formatDate: function (date: Date): string {
        return (date.getDate()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },

    formatCurrency: function (currency: number) {
        return "$" + (Math.round(currency * 100) / 100).toFixed(2);
    },

    visibilityConverter: function (visible: boolean) {
        var result = visible ? Visibility.visible : Visibility.collapse;

        return result;
    }

}

//applicationModule.onLaunch = function (context: any) {
//    serviceModule.service.isLoggedIn().then((isLoggedIn) => {
//        var view = isLoggedIn ? viewsModule.home : viewsModule.login;
//        navigationModule.replace(view);
//    });
//}

applicationModule.mainModule = viewsModule.viewReport;
applicationModule.start();
