
# snippet

- date

        - java

                new Date() is local(where it's created) time since 1970, no timezone stored
                toString use on the fly timeone you call toString

                java8, new LocalDateTime() = local date / clock you see on the wall (depends on server timezone) 
                but no timezone stored e.g. 2007-12-03T10:15:30 or 2007-12-03 10:15:30 (T is ignored)

                if it's created at server side and server timezone is 0
                for client side, Integer timeDifference = 8;
                DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMdd");
                String now = df.format(LocalDateTime.now().plusHours(timeDifference));

        - js

                new Date() is local(where it's created) time, no time zone stored
                toString use on the fly timeone you call toString

                Date.prototype.addHours = function(h) {
                  this.setTime(this.getTime() + (h*60*60*1000));
                  return this;
                }

                Date.prototype.toStr = function() {
                    // yyyy-MM-dd hh:mm:ss
                    return this.getFullYear() + "-" + ("0" + (this.getMonth()+1)).slice(-2) + "-" + ("0" + this.getDate()).slice(-2) + " " + ("0" + this.getHours()).slice(-2) + ":" + ("0" + this.getMinutes()).slice(-2) + ":" + ("0" + this.getSeconds()).slice(-2);
                }

                // 1. plain string -> below new Date(...) = UTC+0

                dateString = "2019-08-15 03:00:00";
                date = new Date(dateString.replace(/-/g, '/')); // for mobile
                date = date.addHours(8);

                console.log(date.toStr());
                // 2019-8-15 11:00:00


                // 2. ISO string -> below new Date(...) = UTC+x

                dateString = "2019-08-15T03:00:00.000Z";  // Z means zero timezone
                date = new Date(dateString.replace(/-/g, '/')); // for mobile
                // no addHours here

                console.log(date.toStr());
                // 2019-8-15 11:00:00

- param, sid

        var App = App || {} ;

        App.getParam = (function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                        return decodeURI(r[2]);
                return null;
        });

        App.createSid = (function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
        });

- replace

        str = str.replace(new RegExp('http://localhost:8080/wx/', 'g'), 'http://x.x.x.x:8080/wx/');

- width

        - flex only control layout/alignment, no control to inner element size
        - iphone6, physical pixels = 750 x 1334px, css pixels = 375 x 667px (chrome device mode)
        - design UI based on physical 750px as canvas width
        - dev based on 375px as screen width
        - use relative length to make it responsive for different devices

                - css rem, relative to font-size of the root element. e.g. font-size of the root element is 16px then 1 rem = 16px for all elements
                - mini rpx, uses iphone6 physical 750px as standard. e.g. iphone6 1rpx = 0.5 css px, iphone6 Plus 1rpx = 0.552 css px, so if you use rpx it displays larger on larger screen

         - upload image within 1mb, width 650px (bit shorter than width of iphone6), try to keep width/height ratio according to UI design, adjust ppi of image according to visual feeling
         - for non-standard ration image, crop center part of it on server/client side
