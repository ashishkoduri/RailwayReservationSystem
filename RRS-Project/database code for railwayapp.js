create table trains(tid int primary key, trainno int, 
						journeydate char(10), 
						noofaccoaches int,
						noofsleepercoaches int,
						acseatsbooked int,
						sleeperseatsbooked int
					   );


create table tickets(pnr int primary key,
					 trainno int,
					 noofpassengers int,
					 coach varchar(7),
					journeydate char(10),
					p1 varchar(10),
					 a1 int,
					 g1 varchar(6),
					 c1 int,
					 b1 char(2),
					 s1 int,
					 p2 varchar(10),
					 a2 int,
					 g2 varchar(6),
					 c2 int,
					 b2 char(2),
					 s2 int,
					 p3 varchar(10),
					 a3 int,
					 g3 varchar(6),
					 c3 int,
					 b3 char(2),
					 s3 int,
					 p4 varchar(10),
					 a4 int,
					 g4 varchar(6),
					 c4 int,
					 b4 char(2),
					 s4 int,
					 p5 varchar(10),
					 a5 int,
					 g5 varchar(6),
					 c5 int,
					 b5 char(2),
					 s5 int,
					 p6 varchar(10),
					 a6 int,
					 g6 varchar(6),
					 c6 int,
					 b6 char(2),
					 s6 int,
					);



create table accoach(seat_no int primary key,berth char(2));

create table sleepercoach(seat_no int primary key,berth char(2));

create table booking_agent(bname varchar(255),bcred int primary key,badd varchar(255));

create or replace procedure ticket_booking(in pnr int ,IN train_no int,IN no_p int,IN coach varchar(7),IN journey_date char(10),
										  IN p1 varchar(30),IN a1 int,IN g1 varchar(6),
										  IN p2 varchar(30),IN a2 int,IN g2 varchar(6),
										  IN p3 varchar(30),IN a3 int,IN g3 varchar(6),
										  IN p4 varchar(30),IN a4 int,IN g4 varchar(6),
										  IN p5 varchar(30),IN a5 int,IN g5 varchar(6),
										  IN p6 varchar(30),IN a6 int,IN g6 varchar(6)
										  )
language plpgsql
as
$$
declare

c1 int;
b1 char(2);
s1 int;
c2 int;
b2 char(2);
s2 int; 
c3 int;
b3 char(2);
s3 int; 
c4 int;
b4 char(2);
s4 int; 
c5 int;
b5 char(2);
s5 int; 
c6 int;
b6 char(2);
s6 int;
f record;
begin
select * from trains into f where trains.trainno = train_no and trains.journeydate = journey_date;
if coach = 'sleeper' and (f.noofsleepercoaches*24 - f.sleeperseatsbooked >= no_p ) then 
	if no_p = 1 then 
		update trains set sleeperseatsbooked = sleeperseatsbooked + 1 where trainno = train_no;
		s1 = f.sleeperseatsbooked%24 + 1;
		c1 = (f.sleeperseatsbooked)/24 + 1;
		select berth from  sleepercoach into b1 where sleepercoach.seat_no = s1;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
	elseif no_p = 2 then
		update trains set sleeperseatsbooked = sleeperseatsbooked + 2 where trainno = train_no;
		s1 = f.sleeperseatsbooked%24 + 1;
		c1 = (f.sleeperseatsbooked)/24 + 1;
		select berth from sleepercoach into b1 where sleepercoach.seat_no = s1;
		s2 = f.sleeperseatsbooked%24 + 2;
		c2 = (f.sleeperseatsbooked+1)/24 + 1;
		select berth from sleepercoach into b2 where sleepercoach.seat_no = s2;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);

	elseif no_p = 3 then
		update trains set sleeperseatsbooked = sleeperseatsbooked + 3 where trainno = train_no;
		s1 = f.sleeperseatsbooked%24 + 1;
		c1 = (f.sleeperseatsbooked)/24 + 1;
		select berth from sleepercoach into b1 where sleepercoach.seat_no = s1;
		s2 = f.sleeperseatsbooked%24 + 2;
		c2 = (f.sleeperseatsbooked+1)/24 + 1;
		select berth from sleepercoach into b2 where sleepercoach.seat_no = s2;
		s3 = f.sleeperseatsbooked%24 + 3;
		c3 = (f.sleeperseatsbooked+2)/24 + 1;
		select berth from sleepercoach into b3 where sleepercoach.seat_no = s3;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);

	elseif no_p = 4 then
		update trains set sleeperseatsbooked = sleeperseatsbooked + 4 where trainno = train_no;
		s1 = f.sleeperseatsbooked%24 + 1;
		c1 = (f.sleeperseatsbooked)/24 + 1;
		select berth from sleepercoach into b1 where sleepercoach.seat_no = s1;
		s2 = f.sleeperseatsbooked%24 + 2;
		c2 = (f.sleeperseatsbooked+1)/24 + 1;
		select berth from sleepercoach into b2 where sleepercoach.seat_no = s2;
		s3 = f.sleeperseatsbooked%24 + 3;
		c3 = (f.sleeperseatsbooked+2)/24 + 1;
		select berth from sleepercoach into b3 where sleepercoach.seat_no = s3;
		s4 = f.sleeperseatsbooked%24 + 4;
		c4 = (f.sleeperseatsbooked+3)/24 + 1;
		select berth from sleepercoach into b4 where sleepercoach.seat_no = s4;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
		
	elseif no_p = 5 then
		update trains set sleeperseatsbooked = sleeperseatsbooked + 5 where trainno = train_no;
		s1 = f.sleeperseatsbooked%24 + 1;
		c1 = (f.sleeperseatsbooked)/24 + 1;
		select berth from sleepercoach into b1 where sleepercoach.seat_no = s1;
		s2 = f.sleeperseatsbooked%24 + 2;
		c2 = (f.sleeperseatsbooked+1)/24 + 1;
		select berth from sleepercoach into b2 where sleepercoach.seat_no = s2;
		s3 = f.sleeperseatsbooked%24 + 3;
		c3 = (f.sleeperseatsbooked+2)/24 + 1;
		select berth from sleepercoach into b3 where sleepercoach.seat_no = s3;
		s4 = f.sleeperseatsbooked%24 + 4;
		c4 = (f.sleeperseatsbooked+3)/24 + 1;
		select berth from sleepercoach into b4 where sleepercoach.seat_no = s4;
		s5 = f.sleeperseatsbooked%24 + 5;
		c5 = (f.sleeperseatsbooked+4)/24 + 1;
		select berth from sleepercoach into b5 where sleepercoach.seat_no = s5;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
		
	elseif no_p = 6 then
		update trains set sleeperseatsbooked = sleeperseatsbooked + 5 where trainno = train_no;
		s1 = f.sleeperseatsbooked%24 + 1;
		c1 = (f.sleeperseatsbooked)/24 + 1;
		select berth from sleepercoach into b1 where sleepercoach.seat_no = s1;
		s2 = f.sleeperseatsbooked%24 + 2;
		c2 = (f.sleeperseatsbooked+1)/24 + 1;
		select berth from sleepercoach into b2 where sleepercoach.seat_no = s2;
		s3 = f.sleeperseatsbooked%24 + 3;
		c3 = (f.sleeperseatsbooked+2)/24 + 1;
		select berth from sleepercoach into b3 where sleepercoach.seat_no = s3;
		s4 = f.sleeperseatsbooked%24 + 4;
		c4 = (f.sleeperseatsbooked+3)/24 + 1;
		select berth from sleepercoach into b4 where sleepercoach.seat_no = s4;
		s5 = f.sleeperseatsbooked%24 + 5;
		c5 = (f.sleeperseatsbooked+4)/24 + 1;
		select berth from sleepercoach into b5 where sleepercoach.seat_no = s5;
		s6 = f.sleeperseatsbooked%24 + 6;
		c6 = (f.sleeperseatsbooked+5)/24 + 1;
		select berth from sleepercoach into b6 where sleepercoach.seat_no = s6;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
	
	end if;

elseif coach = 'ac' and (f.noofaccoaches*18 - f.acseatsbooked >= no_p ) then
	if no_p = 1 then 
		update trains set acseatsbooked = acseatsbooked + 1 where trainno = train_no;
		s1 = f.acseatsbooked%18 + 1;
		c1 = (f.acseatsbooked)/18 + 1;
		select berth from accoach into b1 where accoach.seat_no = s1;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
	elseif no_p = 2 then
		update trains set acseatsbooked = acseatsbooked + 2 where trainno = train_no;
		s1 = f.acseatsbooked%18 + 1;
		c1 = (f.acseatsbooked)/18 + 1;
		select berth from accoach into b1 where accoach.seat_no = s1;
		s2 = f.acseatsbooked%18 + 2;
		c2 = (f.acseatsbooked+1)/18 + 1;
		select berth from accoach into b2 where accoach.seat_no = s2;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);

	elseif no_p = 3 then
		update trains set acseatsbooked = acseatsbooked + 3 where trainno = train_no;
		s1 = f.acseatsbooked%18 + 1;
		c1 = (f.acseatsbooked)/18 + 1;
		select berth from accoach into b1 where accoach.seat_no = s1;
		s2 = f.acseatsbooked%18 + 2;
		c2 = (f.acseatsbooked+1)/18 + 1;
		select berth from accoach into b2 where accoach.seat_no = s2;
		s3 = f.acseatsbooked%18 + 3;
		c3 = (f.acseatsbooked+2)/18 + 1;
		select berth from accoach into b3 where accoach.seat_no = s3;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);

	elseif no_p = 4 then
		update trains set acseatsbooked = acseatsbooked + 4 where trainno = train_no;
		s1 = f.acseatsbooked%18 + 1;
		c1 = (f.acseatsbooked)/18 + 1;
		select berth from accoach into b1 where accoach.seat_no = s1;
		s2 = f.acseatsbooked%18 + 2;
		c2 = (f.acseatsbooked+1)/18 + 1;
		select berth from accoach into b2 where accoach.seat_no = s2;
		s3 = f.acseatsbooked%18 + 3;
		c3 = (f.acseatsbooked+2)/18 + 1;
		select berth from accoach into b3 where accoach.seat_no = s3;
		s4 = f.acseatsbooked%18 + 4;
		c4 = (f.acseatsbooked+3)/18 + 1;
		select berth from accoach into b4 where accoach.seat_no = s4;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
		
	elseif no_p = 5 then
		update trains set acseatsbooked = acseatsbooked + 5 where trainno = train_no;
		s1 = f.acseatsbooked%18 + 1;
		c1 = (f.acseatsbooked)/18 + 1;
		select berth from accoach into b1 where accoach.seat_no = s1;
		s2 = f.acseatsbooked%18 + 2;
		c2 = (f.acseatsbooked+1)/18 + 1;
		select berth from accoach into b2 where accoach.seat_no = s2;
		s3 = f.acseatsbooked%18 + 3;
		c3 = (f.acseatsbooked+2)/18 + 1;
		select berth from accoach into b3 where accoach.seat_no = s3;
		s4 = f.acseatsbooked%18 + 4;
		c4 = (f.acseatsbooked+3)/18 + 1;
		select berth from accoach into b4 where accoach.seat_no = s4;
		s5 = f.acseatsbooked%18 + 5;
		c5 = (f.acseatsbooked+4)/18 + 1;
		select berth from accoach into b5 where accoach.seat_no = s5;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
		
	elseif no_p = 6 then
		update trains set acseatsbooked = acseatsbooked + 6 where trainno = train_no;
		s1 = f.acseatsbooked%18 + 1;
		c1 = (f.acseatsbooked)/18 + 1;
		select berth from accoach into b1 where accoach.seat_no = s1;
		s2 = f.acseatsbooked%18 + 2;
		c2 = (f.acseatsbooked+1)/18 + 1;
		select berth from accoach into b2 where accoach.seat_no = s2;
		s3 = f.acseatsbooked%18 + 3;
		c3 = (f.acseatsbooked+2)/18 + 1;
		select berth from accoach into b3 where accoach.seat_no = s3;
		s4 = f.acseatsbooked%18 + 4;
		c4 = (f.acseatsbooked+3)/18 + 1;
		select berth from accoach into b4 where accoach.seat_no = s4;
		s5 = f.acseatsbooked%18 + 5;
		c5 = (f.acseatsbooked+4)/18 + 1;
		select berth from accoach into b5 where accoach.seat_no = s5;
		s6 = f.acseatsbooked%18 + 6;
		c6 = (f.acseatsbooked+5)/18 + 1;
		select berth from accoach into b6 where accoach.seat_no = s6;
		insert into tickets values (pnr, train_no , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);
	
	end if;
else 
		insert into tickets values (pnr, 1 , no_p , coach , journey_date , p1, a1, g1,c1,b1,s1 ,p2,a2,g2,c2,b2,s2,p3,a3,g3,c3,b3,s3,p4,a4,g4,c4,b4,s4,p5,a5,g5,c5,b5,s5,p6,a6,g6,c6,b6,s6);

	
end if;
end;
$$




create or replace procedure train_release(tid int,tno int,jdate char(10),accoaches int, sleepercoaches int, acbooked int, sleeperbooked int)
language plpgsql
as
$$
declare 
f record;
currdate char(10);
begin
select current_date into currdate;

select * from trains into f where trains.trainno=tno and trains.journeydate=jdate;
if not found then
	if currdate<jdate then
		insert into trains values(tid,tno,jdate,accoaches,sleepercoaches,acbooked,sleeperbooked);
	else
		insert into trains values(tid,1,jdate,accoaches,sleepercoaches,acbooked,sleeperbooked);
	end if;
else
insert into trains values(tid,1,jdate,accoaches,sleepercoaches,acbooked,sleeperbooked);

end if;

end;
$$



