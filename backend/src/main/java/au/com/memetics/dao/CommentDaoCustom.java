package au.com.memetics.dao;

import java.util.List;

import au.com.memetics.entity.Comment;
import au.com.memetics.entity.Comment;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeSearchCriteria;

public interface CommentDaoCustom {
    /*
Same issue as with Meme get I think.
2017-05-06 15:38:53 WARN  org.hibernate.engine.loading.internal.LoadContexts - HHH000100: Fail-safe cleanup (collections) : org.hibernate.engine.loading.internal.CollectionLoadContext@421587a9<rs=com.mysql.jdbc.JDBC42ResultSet@515f8f01>
2017-05-06 15:38:53 WARN  org.hibernate.engine.loading.internal.CollectionLoadContext - HHH000160: On CollectionLoadContext#cleanup, localLoadingCollectionKeys contained [2] entries
      */
    Comment get(long commentId);
    void delete(long memeId);
}
