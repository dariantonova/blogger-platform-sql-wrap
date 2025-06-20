import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BlogsController } from './blogs/api/blogs.controller';
import { BlogsSaController } from './blogs/api/blogs-sa.controller';
import { GetBlogByIdOrInternalFailQueryHandler } from './blogs/application/queries/get-blog-by-id-or-internal-fail.query';
import { GetBlogByIdOrNotFoundFailQueryHandler } from './blogs/application/queries/get-blog-by-id-or-not-found-fail.query';
import { GetBlogsQueryHandler } from './blogs/application/queries/get-blogs.query';
import { CreateBlogUseCase } from './blogs/application/usecases/create-blog.usecase';
import { DeleteBlogUseCase } from './blogs/application/usecases/delete-blog.usecase';
import { UpdateBlogUseCase } from './blogs/application/usecases/update-blog.usecase';
import { BlogsRepository } from './blogs/infrastructure/blogs.repository';
import { BlogsQueryRepository } from './blogs/infrastructure/query/blogs.query-repository';
import { PostsController } from './posts/api/posts.controller';
import { GetBlogPostsQueryHandler } from './posts/application/queries/get-blog-posts.query';
import { GetPostByIdOrInternalFailQueryHandler } from './posts/application/queries/get-post-by-id-or-internal-fail.query';
import { GetPostByIdOrNotFoundFailQueryHandler } from './posts/application/queries/get-post-by-id-or-not-found-fail.query';
import { GetPostsQueryHandler } from './posts/application/queries/get-posts.query';
import { CreatePostUseCaseWrap } from './posts/application/usecases/create-post.usecase';
import { DeleteBlogPostUseCaseWrap } from './posts/application/usecases/delete-blog-post.usecase';
import { UpdateBlogPostUseCaseWrap } from './posts/application/usecases/update-blog-post.usecase';
import { PostsRepository } from './posts/infrastructure/posts.repository';
import { PostsQueryRepository } from './posts/infrastructure/query/posts.query-repository';
import { CommentsController } from './comments/api/comments.controller';
import { GetCommentByIdOrInternalFailQueryHandler } from './comments/application/queries/get-comment-by-id-or-internal-fail.query';
import { GetCommentByIdOrNotFoundFailQueryHandler } from './comments/application/queries/get-comment-by-id-or-not-found-fail.query';
import { GetPostCommentsQueryHandler } from './comments/application/queries/get-post-comments.query';
import { CreateCommentUseCase } from './comments/application/usecases/create-comment.usecase';
import { DeleteCommentUseCaseWrap } from './comments/application/usecases/delete-comment.usecase';
import { UpdateCommentUseCaseWrap } from './comments/application/usecases/update-comment.usecase';
import { CommentsRepository } from './comments/infrastructure/comments.repository';
import { CommentsQueryRepository } from './comments/infrastructure/query/comments.query-repository';
import { MakePostLikeOperationUseCaseWrap } from './likes/application/usecases/make-post-like-operation.usecase';
import { PostLikesRepository } from './likes/infrastructure/post-likes.repository';
import { MakeCommentLikeOperationUseCase } from './likes/application/usecases/make-comment-like-operation.usecase';
import { CommentLikesRepository } from './likes/infrastructure/comment-likes.repository';
import { BloggerPlatformExternalService } from './common/infrastructure/external/blogger-platform.external-service';

const controllers = [
  BlogsController,
  BlogsSaController,
  PostsController,
  CommentsController,
];
const providers = [
  BlogsRepository,
  BlogsQueryRepository,
  PostsRepository,
  PostsQueryRepository,
  CommentsRepository,
  CommentsQueryRepository,
  PostLikesRepository,
  CommentLikesRepository,
  BloggerPlatformExternalService,
];
const queryHandlers = [
  GetBlogByIdOrInternalFailQueryHandler,
  GetBlogByIdOrNotFoundFailQueryHandler,
  GetBlogsQueryHandler,
  GetBlogPostsQueryHandler,
  GetPostByIdOrInternalFailQueryHandler,
  GetPostByIdOrNotFoundFailQueryHandler,
  GetPostsQueryHandler,
  GetCommentByIdOrInternalFailQueryHandler,
  GetCommentByIdOrNotFoundFailQueryHandler,
  GetPostCommentsQueryHandler,
];
const commandHandlers = [
  CreateBlogUseCase,
  DeleteBlogUseCase,
  UpdateBlogUseCase,
  CreatePostUseCaseWrap,
  DeleteBlogPostUseCaseWrap,
  UpdateBlogPostUseCaseWrap,
  CreateCommentUseCase,
  DeleteCommentUseCaseWrap,
  UpdateCommentUseCaseWrap,
  MakePostLikeOperationUseCaseWrap,
  MakeCommentLikeOperationUseCase,
];

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [...controllers],
  providers: [...providers, ...queryHandlers, ...commandHandlers],
  exports: [BloggerPlatformExternalService],
})
export class BloggerPlatformModule {}
