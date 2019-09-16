
# snippet

- date

        - java

                // 1. new LocalDateTime() = local date(depends on server timezone) without timezone e.g. 2007-12-03T10:15:30 or 2007-12-03 10:15:30 (T is ignored)

                Integer timeDifference = 8;
                DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMdd");
                String now = df.format(LocalDateTime.now().plusHours(timeDifference));


        - js

                Date.prototype.addHours = function(h) {
                  this.setTime(this.getTime() + (h*60*60*1000));
                  return this;
                }
                
                Date.prototype.toStr = function() {
                    // yyyy-MM-dd hh:mm:ss
                    return this.getFullYear() + "-" + ("0" + (this.getMonth()+1)).slice(-2) + "-" + ("0" + this.getDate()).slice(-2) + " " + ("0" + this.getHours()).slice(-2) + ":" + ("0" + this.getMinutes()).slice(-2) + ":" + ("0" + this.getSeconds()).slice(-2);
                }

                // 1. new Date(...) = UTC+0

                dateString = "2019-08-15 03:00:00";
                date = new Date(dateString.replace(/-/g, '/')); // for mobile
                date = date.addHours(8);

                console.log(date.toStr());
                // 2019-8-15 11:00:00


                // 2. ISO string, new Date(...) = local date

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
