package com.tob.cart;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.tomcat.util.http.mapper.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tob.mapper.CartMapper;

@Service
public class CartServiceImpl implements CartService {
	private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);
	@Autowired private SqlSession sqlSession;
	@Autowired CartVO cart;
	@Autowired CartTodayVO cartToday;
	@Autowired BookCartVO bookCart;
	List<?> BooksInCart;
	List<?> UserIdList;
	@Override
	public int put(String bookId, String userid) {
		logger.info("CartServiceImpl : put 진입");
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat sdf2 = new SimpleDateFormat("HHmmss");

        Calendar c1 = Calendar.getInstance();

    	String cartToday1 = sdf.format(c1.getTime());
    	String var = "-";
    	String strToday2 = sdf2.format(c1.getTime());
    	String result = cartToday1 + var + strToday2;
    	logger.info("넘어온 책 아이디 : " + bookId);
    	logger.info("넘어온 유저 아이디 : " + userid);
    	logger.info("생성된 카트 넘버 : " + result);
        
    	for (int i = 0; i < BooksInCart.size(); i++) {
			if (bookId.equals(BooksInCart.get(i))) {
				return 0;
			} 
		}
    	cart.setCartNum(result);
    	cart.setCartToday(cartToday1);
     	cart.setBookid(bookId);
     	cart.setUserid(userid);
     	cart.setCount("1");
     	logger.info("바뀐 카트VO의  책 아이디 : " + cart.getBookid());
    	logger.info("바뀐 카트VO의 유저 아이디 : " + cart.getUserid());
    	logger.info("바뀐 카트VO의 카트 넘버 : " + cart.getCartNum());
    	
     	/*for (int i = 0; i < BookIdList.size(); i++) {
			if (BookIdList.get(i).equals(BookIdList.get(i)) && UserIdList.get(i-1).equals(UserIdList.get(i))) {
				i = 0;
				return 0;
			}
		}*/
    	CartMapper mapper = sqlSession.getMapper(CartMapper.class);
     	return mapper.put(cart);
	}
	@Override
	public List<BookCartVO> getTodayList(String userid) {
		logger.info("CartServiceImpl : getTodayList 진입");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		 Calendar c1 = Calendar.getInstance();
		 String cartToday1 = sdf.format(c1.getTime());
		 cartToday.setCartToday(cartToday1);
		 cartToday.setUserid(userid);
		 CartMapper mapper = sqlSession.getMapper(CartMapper.class);
		 
		return mapper.getTodayList(cartToday);
	}
	@Override
	public List<BookCartVO> getList(String userid) {
		logger.info("CartServiceImpl : getList 진입");
		CartMapper mapper = sqlSession.getMapper(CartMapper.class);
		return mapper.getList(userid);
	}
	@Override
	public int remove(String bookId) {
		logger.info("CartServiceImpl : remove 진입");
		CartMapper mapper = sqlSession.getMapper(CartMapper.class);
		return mapper.remove(bookId);
	}
	@Override
	public int changeCount(String userid, int count, String bookId) {
		logger.info("CartServiceImpl : changeCount 진입");
		logger.info(userid);
		String count1 = Integer.toString(count);
		logger.info(count1);
		CartMapper mapper = sqlSession.getMapper(CartMapper.class);
		bookCart.setUserid(userid);
		bookCart.setCount(count);
		bookCart.setBookId(bookId);
		return mapper.changeCount(bookCart);
	}
	@Override
	public int empty(String userid) {
		logger.info("CartServiceImpl : empty 진입");
		CartMapper mapper = sqlSession.getMapper(CartMapper.class);
		return mapper.empty(userid);
	}
	@Override
	public List<?> getBooksInCart(String userid) {
		logger.info("CartServiceImpl : getBooksInCart 진입");
		CartMapper mapper = sqlSession.getMapper(CartMapper.class);
		BooksInCart = mapper.getBooksInCart(userid);
		return mapper.getBooksInCart(userid);
	}
	@Override
	public List<?> getUseridList() {
		logger.info("CartServiceImpl : getUseridList 진입");
		CartMapper mapper = sqlSession.getMapper(CartMapper.class);
		UserIdList= mapper.getUseridList();
		logger.info("getUseridList 의 결과 : {}",UserIdList.size());
		return mapper.getUseridList();
	}
	
	
	
	
}
