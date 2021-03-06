
var Member = {
		login : function(context) {
			$.ajax({
				url : context+'/member/login',
				data : {
					userid : $('#userid').val(),
					password : $('#password').val()
				},
				type : 'post',
				datatype : 'json',
				success : function(data) {
					if (data.userid === $('#userid').val() && data.password === $('#password').val()) {
						location.href = "";
					} else if (data.userid === $('#userid').val() && data.password !== $('#password').val()){
						alert('비밀번호를 확인하세요');
					} else if (data.userid !== $('#userid').val() && data.password === $('#password').val()) {
						alert('아이디를 확인하세요.');
					} else {
						alert('아이디 혹은 비밀번호를 확인하세요');
					}
				},
				error : function() {
					alert('에러');
				}
			});
		},
		change : function(context) {
			
		$.getJSON(context+'/member/')
			$.ajax(context+'/member/change',{
				data : { //이름, 생일, 이메일, 폰, 주소
					password : $('#ch_password').val(),
					name : $('#ch_name').val(),
					birth : $('#ch_birth').val(),
					gender : $(':radio:checked').val(),
					email : $('#ch_email').val(),
					phone : $('#ch_phone').val(),
					addr : $('#ch_addr').val()
				},
				dataType : "json",
				type : 'get',
				contentType : "application/json;",
				mimeType : "application/json;",
				async : false,
				success : function(data) {
					if (data.userid !== null) {
						alert('회원정보가 수정되었습니다.');
						location.href="";
					} else {
						alert('미입력한 정보가 있습니다.');
					}
					
				},
				error : function() {
					alert('ajax 에러');
				}
				
			});
			
			
		},
		join : function() {
			var member = {
				"userid" : $('#up_userid').val(),
				"password" : $('#up_password').val(),
				"name" : $('#up_name').val(),
				"birth" : $('#up_birth').val(),
				"gender" : $(':radio:checked').val(),
				"email" : $('#up_email').val(),
				"phone" : $('#up_phone').val(),
				"addr" : $('#up_addr').val(),
			};
			$.ajax({
				url : context+"/member/join",
				data : JSON.stringify(member),
				dataType : "json",
				type: 'post',
				contentType : "application/json",
				mimeType : "application/json",
				async : false,
				success : function(data) {
					if (data != null) {
						alert(data.name + "님 회원가입 가입되었습니다.");
						location.href = "";
					} else {
						alert("회원가입 중 오류가 발생했습니다.");
						return false;
					}
				},
				error : function(e) {
					alert("이미 존재하는 아이디가 있습니다.");
				}
			});
		},
		detail : function(url) {
			$.getJSON(url,
				function(data){
				var table = '<table align="center"><tr><td rowspan="7" id="td_profile"><img id="profile" src="'+img+'/'+data.profile+'" width="70%" height="80%"/></td>'
				+'<th id="item">항목</th><th>빈 칸</th></tr><tr><td>아이디</td><td>'+data.userid+'</td></tr><tr><td>비밀번호</td><td>'+data.password+''
				+'</td></tr><tr><td>이름</td><td>'+data.name+'</td></tr><tr><td>생일</td><td>'+data.gender+'</td></tr><tr>'
				+'<td>주소</td><td>'+data.addr+'</td></tr><tr><td>이메일</td><td>'+data.email+'</td></tr>'
				+'<tr><td><button id="changeImg">사진변경</button></td>'
				+'<td><button id="changeInfo">정보수정</button><button id="remove">회원탈퇴</button></td>'
				+'<td><button id="confirm">확인</button></td></tr></table>';
				$('.mainView').html(table);
				Member.style();
				$('#changeInfo').click(function() {
					Member.updateForm(data.userid);
				});
				$('#remove').click(function() {
					Member.remove(data.userid);
				});
			});
		},
		updateForm : function(userid) {
			$.getJSON(context+'/member/updateForm/'+userid,
					function(data){
				var updates = '<form align="center" action="'+context+'/member/update" id="frm">';
				$('.mainView').empty();
				$('.mainView').append(updates);
				var table = '<table align="center"><tr><td rowspan="7" id="td_profile"><img id="profile" src="'+img+'/'+data.profile+'" width="70%" height="80%"/></td>'
				+'<th id="item">항목</th><th>빈 칸</th></tr><tr><td>아이디</td><td>'+data.userid+'</td></tr><tr>'
				+'<td>비밀번호</td><td><input type="password" id="password" value='+data.password+'>'
				+'</td></tr><tr><td>이름</td><td>'+data.name+'</td></tr><tr><td>생일</td><td>'+data.gender+'</td></tr><tr>'
				+'<td>주소</td><td><input type="text" id="addr" value='+data.addr+'></td></tr>'
				+'<tr><td>이메일</td><td><input type="text" id="email" value='+data.email+'></td>'
				+'<tr><td><button id="changeImg">사진변경</button></td>'
				+'<td><button id="changeInfo">정보수정</button></td>'
				+'<td><button id="confirm">확인</button></td></tr></table>';
				$('#frm').html(table);
				Member.style();
				$('#confirm').click(function() {
					$('#frm').submit(function(e) {
						e.preventDefault(); /* 기본 폼태그의 서브밋을 막아라. 자스의 서브밋을 실행해라 */
						$.ajax(context+'/member/update',{
							/*type : 'get',*/
							data : {
								password : $('#password').val(),
								addr : $('#addr').val(),
								phone : $('#phone').val(),
								email : $('#email').val()
								/*page : 'update'*/
							},
							async : true, // 비동기로 할 지 여부, 기본값  true, 생략가능
							dataType : 'json',
							success : function(data) {
								location.href=''+context+'/member/detail/'+data.userid;
							},
							error : function(xhr, status, msg) {
								alert('에러발생상태 : '+status +', 내용 :'+msg);
								// error 는 파라미터 갯수와 위치로 그 역할을 결정하기 때문에
								// xhr 은 자리를 지키고 있어야, status 와 msg 가 작동한다.
							}
						});
					});
				});
			});
		},
		style : function(){
			$('td').css('text-align','center');
			$('tr').add('th').add('td').css('float','center');
			$('.mainView').css('clear','both').css('margin','20px');
			$('.item').css('width','400px');
			$('.profile').css('width','300px');
			$('.td_profile').css('width','400px');
		},
		remove : function(userid) {
			$.ajax(''+context+'/member/remove/'+userid,{
				dataType : 'json',
				success : function(data) {
					alert('회원탈퇴 되었습니다.');
					location.href = ''+context+'/member/logout';
				},
				error : function(xhr, status, msg) {
					alert('에러발생상태 : '+status +', 내용 :'+msg);
				}
			});
		}
			/*cartlist : function(userid) {
				alert('리스트는 하루동안 담은 내역을 보여주는것으로..');
				alert('cartlist 진입, 넘어온 아이디 : '+userid);
				var arr = [];
				$.getJSON(context+'/cart/list/'+userid, function(data) {
					var table = '<div id="cartList"><h1> TOB 배송 상품 장바구니</h1>'
						+'<table id="pur_list"><tr><th>책 이름</th>'
						+'<th>가격</th><th>수량</th></tr>';
					$.each(data, function(i, val) {
						table +='<tr><td><a href="#" id="'+this.bookName+'">'+this.bookName+'</a></td>'
						+'<td>'+this.bookPrice+'</td>'
						+'<td>'+this.count+'</td>'
						+'<td><button id="o'+i+'">주문하기</button></td>'
						+'<td><button id="d'+i+'">삭제하기</button></td></tr>'
						arr.push(this.purNum);
					});
					table += '</table></div>';
					$(table).appendTo($('.mainView').empty());
					$('.mainView').empty().append(table);
					
					삭제시 필요한 파라미터 : CART_TODAY, BOOK_ID, USERID
					$.each(data, function(i, val) {
						
					});
				});
			}*/
};

