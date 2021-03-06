//
//  ZLDrawCircleProgressBtn.m
//  ZLStartPageDemo
//
//  Created by ZL on 2017/3/1.
//  Copyright © 2017年 ZL. All rights reserved.
//

#import "ZLDrawCircleProgressBtn.h"

#define degreesToRadians(x) ((x) * M_PI / 180.0)

@interface ZLDrawCircleProgressBtn ()

// 底部进度条圈
@property (nonatomic, strong) CAShapeLayer *trackLayer;
// 表层进度条圈
@property (nonatomic, strong) CAShapeLayer *progressLayer;
@property (nonatomic, strong) UIBezierPath *bezierPath;
@property (nonatomic, copy)   DrawCircleProgressBlock myBlock;

@end

@implementation ZLDrawCircleProgressBtn 

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self == [super initWithFrame:frame]) {
        self.backgroundColor = [UIColor clearColor];
        
        [self.layer addSublayer:self.trackLayer];
        
    }
    return self;
}

- (UIBezierPath *)bezierPath {
    if (!_bezierPath) {
        
        CGFloat width = CGRectGetWidth(self.frame)/2.0f;
        CGFloat height = CGRectGetHeight(self.frame)/2.0f;
        CGPoint centerPoint = CGPointMake(width, height);
        float radius = CGRectGetWidth(self.frame)/2;
        
        _bezierPath = [UIBezierPath bezierPathWithArcCenter:centerPoint
                                                     radius:radius
                                                 startAngle:degreesToRadians(-90)
                                                   endAngle:degreesToRadians(270)
                                                  clockwise:YES];
    }
    return _bezierPath;
}

- (CAShapeLayer *)trackLayer {
    if (!_trackLayer) {
        _trackLayer = [CAShapeLayer layer];
        _trackLayer.frame = self.bounds;
        // 圈内填充色
        _trackLayer.fillColor = self.fillColor.CGColor ? self.fillColor.CGColor : [UIColor clearColor].CGColor ;
        _trackLayer.lineWidth = self.lineWidth ? self.lineWidth : 2.f;
        // 底部圈色
        _trackLayer.strokeColor = self.trackColor.CGColor ? self.trackColor.CGColor : [UIColor colorWithRed:169/255.0 green:169/255.0 blue:169/255.0 alpha:1].CGColor ;
        _trackLayer.strokeStart = 0.f;
        _trackLayer.strokeEnd = 1.f;
        
        _trackLayer.path = self.bezierPath.CGPath;
    }
    return _trackLayer;
}

- (CAShapeLayer *)progressLayer {
    
    if (!_progressLayer) {
        _progressLayer = [CAShapeLayer layer];
        _progressLayer.frame = self.bounds;
        _progressLayer.fillColor = [UIColor clearColor].CGColor;
        _progressLayer.lineWidth = self.lineWidth ? self.lineWidth : 2.f;
        _progressLayer.lineCap = kCALineCapRound;
        // 进度条圈进度色
        _progressLayer.strokeColor = self.progressColor.CGColor ? self.progressColor.CGColor  : [UIColor  colorWithRed:255.0/255.0 green:0/255.0 blue:0/255.0 alpha:1].CGColor;
        _progressLayer.strokeStart = 0.f;
        
        CABasicAnimation *pathAnimation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
        pathAnimation.duration = self.animationDuration;
        pathAnimation.fromValue = @(0.0);
        pathAnimation.toValue = @(1.0);
        pathAnimation.removedOnCompletion = YES;
        pathAnimation.delegate = self;
        [_progressLayer addAnimation:pathAnimation forKey:nil];
        
        _progressLayer.path = _bezierPath.CGPath;
    }
    return _progressLayer;
}

#pragma mark -- CAAnimationDelegate
- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
    if (flag) {
        self.myBlock();
    }
}

#pragma mark ---
- (void)startAnimationDuration:(CGFloat)duration withBlock:(DrawCircleProgressBlock )block {
    self.myBlock = block;
    self.animationDuration = duration;
    [self.layer addSublayer:self.progressLayer];
}


@end
