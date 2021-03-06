/* Parse actions in a commit */
commit = actions:( action / any ) * {
    return actions.filter(function(a) { return !!a; });
}

/* actions */
action = logAction / closeAction / progressAction

closeAction = ("complet"i ("ed"i / "es"i / "e"i) / "close"i "s"i? / "fix"i "es"i?) __ task:task {
    return { name: "CloseTask", task: task }
}

logAction = ("log"i "ged"i? / "completed"i / "done"i / "did"i / "finished"i / "worked"i) __ duration: duration __ to __ task:task {
   return { name: "Log", duration: duration, task: task }
}

progressAction = ("add"i "s"i? / "progress" "es"i?) (__ to)? __ progress:progress __ to __ task:task{
    return { name: "ProgressTask", progress: progress, task: task }
}

to = "to"i / "on"i

/* Duration */
duration = hourAndMinute / hour / minute 

hourAndMinute = hour:hour minute:minute {
    return { 
        hours: hour.hours, 
        minutes: minute.minutes 
    }
}

minute = minute:[0-9]+ "m"i { 
    return { 
        minutes: parseInt(minute.join(""), 10)
    } 
}

hour = hour:[0-9]+ "h"i { 
    return { 
        hours: parseInt(hour.join(""), 10) 
    } 
}

/* Progress */
progress = sign:[-+]? percent:[0-9]+ "%" {
    var num = sign == "-" ? -1 : 1;
    return { 
        relative: !!sign, 
        percent: parseInt(percent.join(""), 10) * num 
    };
}

/* installation */
domain = ("http" "s"? "://")? installation:[a-zA-Z]+ ".teamwork.com" { return installation.join("") }
installation = installation:domain "/"? .* { return installation + ".teamwork.com"; }

/* Task */
task = task:(taskID / taskURL) {
   return task;
}

taskID = "#" id:taskNum { return id }
taskURL = domain "/tasks/" id:taskNum { return id; }
taskNum = id:[0-9]+ { return parseInt(id.join(""), 10); }

/* optional whitespace */
_  = [ \t\r\n]*

/* mandatory whitespace */
__ = [ \t\r\n]+

any = . { return null; }