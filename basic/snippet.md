
# snippet

- java

        // 1. new LocalDateTime() = A date-time without a time-zone in the ISO-8601 calendar system, e.g. 2007-12-03T10:15:30

        Integer timeDifference = 8;
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMdd");
        String now = df.format(LocalDateTime.now().plusHours(timeDifference));


- js

        // 1. new Date() = UTC+0

        Date.prototype.addHours = function(h) {
          this.setTime(this.getTime() + (h*60*60*1000));
          return this;
        }
      
        dateString = "2019-08-15 03:00:00";
        date = new Date(dateString).addHours(8);

        dateString = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " +
        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);

        console.log(dateString);
        // 2019-8-15 11:00:00


        // 2. ISO string, new Date() = local date

        dateString = "2019-08-15T03:00:00.000Z";
        date = new Date(dateString); 

        dateString = date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " +
        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);

        console.log(dateString);
        // 2019-8-15 11:00:00
