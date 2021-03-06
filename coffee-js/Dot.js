// Generated by CoffeeScript 1.3.3
/*

Android Pattern Lock Screen 
http://cheghamwassim.com/apps/js/android-lock-screen/

Copyright 2012, Wassim Chegham
Licensed under the MIT or GPL Version 2 licenses.

The Dot class.
This is the base class for all the circles that are drawn in the container.
There are three kinds of dots:
- The inner dots, those are the gray ones that are initially drawn,
- The outer dots, those are the user's ones.
- The listener dots, those are the invisible ones that listen for user's event

@constructor
@private
*/

var Dot;

Dot = (function() {

  function Dot(id, o) {
    var minDotRadius, stage,
      _this = this;
    this._id = id;
    this._x = o.x;
    this._y = o.y;
    this._dotInnerLayer = o.innerLayer;
    this._listenerLayer = o.listenerLayer;
    this._pattern = o.pattern;
    this._innerCircleRadius = 5;
    this._innerCircleFill = "rgba(255,255,255,0)";
    this._innerCircleStroke = "#aaa";
    this._strokeWidth = 4;
    stage = this._dotInnerLayer.getStage();
    minDotRadius = Math.min(stage.getWidth(), stage.getHeight());
    this._outerCircleConfig = {
      radius: minDotRadius / 10,
      fill: "rgba(255,255,255,0)",
      stroke: "lime",
      strokeWidth: this._strokeWidth
    };
    this._innerCircle = (function() {
      return new Kinetic.Circle({
        x: _this._x,
        y: _this._y,
        radius: _this._innerCircleRadius,
        fill: _this._innerCircleFill,
        stroke: _this._innerCircleStroke,
        strokeWidth: _this._strokeWidth
      });
    })();
    this._listenerCircle = (function() {
      return new Kinetic.Circle({
        x: _this._x,
        y: _this._y,
        radius: _this._outerCircleConfig.radius,
        fill: 'transparent'
      });
    })();
    this._listenerCircle.on("mousedown mousemove touchmove", this._showUserDot.bind(this));
    this._listenerCircle.on("mouseout", this._mouseout.bind(this));
    this._listenerCircle.on("mouseup touchend", this._isValid.bind(this));
    this._listenerLayer.add(this._listenerCircle);
    this._dotInnerLayer.add(this._innerCircle);
    this._dotInnerLayer.draw();
  }

  Dot.prototype.getX = function() {
    return this._x;
  };

  Dot.prototype.getY = function() {
    return this._y;
  };

  Dot.prototype._isValid = function() {
    var btn, event;
    if (this._pattern.isRecording) {
      return false;
    }
    event = (function() {
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent("click", true, true);
        return event;
      } else {
        event = document.createEventObject();
        event.eventType = "click";
        return event;
      }
    })();
    btn = document.getElementById("unlock-button");
    if (btn.dispatchEvent) {
      btn.dispatchEvent(event);
    } else if (btn.fireEvent) {
      btn.fireEvent("on" + event.eventType, event);
    }
    return true;
  };

  Dot.prototype._showUserDot = function() {
    var outerCircle,
      _this = this;
    document.body.style.cursor = "pointer";
    this._innerCircle.setStrokeWidth(2);
    this._dotInnerLayer.draw();
    outerCircle = (function() {
      return new Kinetic.Circle({
        x: _this._innerCircle.getX(),
        y: _this._innerCircle.getY(),
        radius: 0,
        fill: _this._outerCircleConfig.fill,
        stroke: _this._outerCircleConfig.stroke,
        strokeWidth: _this._outerCircleConfig.strokeWidth
      });
    })();
    return this._pattern.addDot(outerCircle, this._outerCircleConfig);
  };

  Dot.prototype._mouseover = function() {
    document.body.style.cursor = "pointer";
    return true;
  };

  Dot.prototype._mouseout = function() {
    document.body.style.cursor = "default";
    return true;
  };

  Dot.prototype.clear = function() {
    this._innerCircle.setFill(this._innerCircleFill);
    this._innerCircle.setRadius(this._innerCircleRadius);
    this._innerCircle.setStrokeWidth(this._innerCircleRadius);
    this._dotInnerLayer.draw();
    return true;
  };

  return Dot;

})();
