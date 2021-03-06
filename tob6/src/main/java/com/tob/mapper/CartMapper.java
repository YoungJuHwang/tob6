package com.tob.mapper;

import java.util.List;

import com.tob.cart.BookCartVO;
import com.tob.cart.CartTodayVO;
import com.tob.cart.CartVO;

public interface CartMapper {
		// C
		public int put(CartVO cart);
		
		//R
		public List<BookCartVO> getList(String userid);
		public List<BookCartVO> getTodayList(CartTodayVO o);
		public List<?> getBooksInCart(String userid);
		public List<?> getUseridList();
		
		//U
		public int changeCount(BookCartVO o);
		
		//D
		public int remove(String bookid);
		public int empty(String userid); 
}
