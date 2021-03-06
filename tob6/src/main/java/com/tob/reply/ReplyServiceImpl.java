package com.tob.reply;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.tob.global.Command;
import com.tob.mapper.ReplyMapper;

@Service
public class ReplyServiceImpl implements ReplyService {
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(ReplyServiceImpl.class);
	@Autowired private SqlSession sqlSession;
	
	
	
	@Override
	public int insert(ReplyVO o) {
		ReplyMapper mapper = sqlSession.getMapper(ReplyMapper.class);
		return mapper.insert(o);
	}

	@Override
	public int update(ReplyVO o) {
		ReplyMapper mapper = sqlSession.getMapper(ReplyMapper.class);
		return mapper.update(o);
	}

	@Override
	public int delete(int replySeq) {
		ReplyMapper mapper = sqlSession.getMapper(ReplyMapper.class);
		return mapper.delete(replySeq);
	}

	@Override
	public int count() {
		ReplyMapper mapper = sqlSession.getMapper(ReplyMapper.class);
		return mapper.count();
	}

	@Override
	public List<ReplyVO> selectAll() {
		ReplyMapper mapper = sqlSession.getMapper(ReplyMapper.class);
		return mapper.selectAll();
	}

	@Override
	public int reply(ReplyVO reply) {
		ReplyMapper mapper = sqlSession.getMapper(ReplyMapper.class);
		return mapper.reply(reply);
	}

	@Override
	public List<String> getList(String evtId) {
		ReplyMapper mapper = sqlSession.getMapper(ReplyMapper.class);
		return mapper.getList(evtId);
	}

}
