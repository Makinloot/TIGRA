import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Tag, Avatar, Tooltip, Modal, InputNumber, Select, Space, Spin } from 'antd';
import { ClockCircleOutlined, PlayCircleOutlined, PauseCircleOutlined, SoundOutlined, SoundTwoTone, StopOutlined } from '@ant-design/icons';
import './Hero.css';

// List of all available avatars
const ALL_AVATARS = [
  "0450249b131eec36dc8333b7cf847bc4.webp", "06d29f74c2f85239efe3f9ade1b96da7.webp",
  "098d5b19a0870d95bee0cdbcef632be1.webp", "112413f070536d15170606f2d00aa15d.webp",
  "119d9abaee7a1e987571f0fe776bd1a5.webp", "1a270860bac2c66b434968a3047822e3.webp",
  "1a3318330cf1734feb84887e9453fb1b.webp", "1bab427466457e745328f6eb8fa227e1.webp",
  "1c9a4dd0bbd964e3eecbd40caf3b7e37.webp", "1dd1b479633b29ff2fd9d6644581f394.webp",
  "2244af71ad0c25f2cb0a8efa167491fb.webp", "237d3876ef98d5364ed1326813f4ed5b.webp",
  "261cb9a6ae028b862eaf692b10033fb7.webp", "27d73d5efa51661b5feb1e29cc389257.webp",
  "2866b308b3c70e895e34b3130f10abf3.webp", "2b04cc0b930f82afe6c38d3209dcbdfd.webp",
  "2d81c3469090a90daff20560a129b182.webp", "2fafd2ca0fa23ca91ec778674c26081a.webp",
  "2fb0e578a8ab6f8073092ae637c87835.webp", "321f5bcb6efc56013d67ae101f196eaf.webp",
  "33642b1fa839338a7d53d78336a45ff0.webp", "386f22acf2f226c3a9ad7ad66fdce7a6.webp",
  "40687889cb61a06b242aafb9e02f5204.webp", "4184423b57c070204a1942282818dc0c.webp",
  "439620a6c05132c82d67fc1593a7e19a.webp", "44198079c5211172a61405b5049f3bfb.webp",
  "44b312165ea1bb924bdccf01bf1bb443.webp", "44f647f9e3c4767d3b83e89e67917f41.webp",
  "466989c631bca15c46ae9c1e62269a5a.webp", "4a8eb80a6f610949b28dd91f45e7d6e2.webp",
  "4b59f1b8af326b6381c39ab29c3612d6.webp", "4dfaa7ded74ac66557b5940f7290c840.webp",
  "50382765fd5648c7876d91cc37b27394.webp", "5c9a412b4e80d08303731bca471d3b63.webp",
  "5cd1cd3d1851e162616256ebe2a4c30a.webp", "60467e1ae6f97acb8964f5aa617c7ecb.webp",
  "622e4c7767d4eb0307179d6dfda9248b.webp", "644dfc35027924a6e5dfbcad653be697.webp",
  "67b732b96785fd368415dd82951466c1.webp", "6914da7a3557e685836a71e635c237b9.webp",
  "69c04d9c4dc60b59bac65938e070e7cf.webp", "6ade325cd4c136112f25e63f888eb7de.webp",
  "6bde7f630b3933ee1b92b0ec2df665c2.webp", "6ffe2b7df2b99ba5cc2c65692dd0d568.webp",
  "706e8643277a95c3f80005f70cf53cb9.webp", "70a23294beb91b4ad5a439e2c6ea5a6d.webp",
  "76891f0bd337c6ee10f84067d7808044.webp", "78529e2ec8eb4a2eb2fb961e04915b0a.webp",
  "78c7bf3d348d505f15d332f9a58092f7.webp", "7ae3a0ffcf9eb41156244fbaa3588de7.webp",
  "7c9062905b4ce3d276dfffd2b34bbb49.webp", "7d24c27f40be0d43618f6d49e26a3288.webp",
  "8654c911c90383bb42a6cdddd66014c5.webp", "869f67a992bb6ca4cb657fb9fc634893.webp",
  "8940e8ea369def14e82f05a5fee994b9.webp", "897cda132d24997b106d57ccd0530927.webp",
  "899e2a12b136acdc5366e76d15d83244.webp", "8c0e0a2a3a1c7068ea221aa8a0f429e0.webp",
  "8fcd9a7c3003dd0ad23e371475d130b3.webp", "92770c61168481c94e1ba43df7615fd8.webp",
  "944c5ba154e0489274504f38d01bcfaf.webp", "94f5ac7e7b78495be7df7e5ca427fd5c.webp",
  "9854663aec5741bbbe84290b6edc0aed.webp", "9d119d757ff7d7b36b9d71b86d973fbe.webp",
  "a2d4e522bd8e359b60d4e40a6c50fa6e.webp", "a47cfeaf97371ec735a870781978fcf5.webp",
  "a599c01dec11cb6099c6aacafe3bc5a9.webp", "b00e1ebc65fc7f2c53c9a9a955a49be5.webp",
  "b0a4b1922813b989103a3616d7111562.webp", "b89db8099e05245d0f3e19be6beeafca.webp",
  "b8c1cb5042e9b54e27d18d6ecfb46087.webp", "baa928fef9b0f2e838263dd88eefc707.webp",
  "bb3d2a58ea153b635a4951d82affb4db.webp", "bb8c76bcb73cf00e7d4ab920447a365c.webp",
  "bc61d859626dbb47d69f86e10421c50e.webp", "bc8e6056aa877de4ae5ab1321f776ade.webp",
  "c0e1c0e6224c14a140748d8cef481883.webp", "c29e12118b27e54e8883db0b98c610df.webp",
  "c33237da3438494d1abc67166196484e.webp", "c6b7069df1a634e3db7ba5e9b923d3a8.webp",
  "cacf6ab4ea79648699479021e7892224.webp", "cae99bb14b21ec41ecf03b58f59ff292.webp",
  "d1499909450ba526d5297e3ebc7f6d07.webp", "d36865e08723cc1b764e084873e53662.webp",
  "d447a9fd5010652f6c0911fbe9c662c6.webp", "d7d9e6977ad4053c3dfab772ba1d2c1f.webp",
  "dae17037af459cca4ed1b8a474e7428e.webp", "e2cb7b8c41eba64187df1fc6128a3f8e.webp",
  "e6f79cdf2a45c0eb58b3f93407361989.webp", "ecf088e6a05f2c8d5c041384e3568b46.webp",
  "ed7055b68adec22bfa8a88d441e83e9a.webp", "ee7173cf2acfcb909ead7a23f3e01493.webp",
  "eecd70bbeb08e2fc531ca498b9fc4f0d.webp", "ef4a7e86005e0e9e49dbbae2280c1f10.webp",
  "f0474688ec350e08543f55b3771dcada.webp", "f0fb14746f3fc6020a0e1afdd089a4fb.webp",
  "f118c882025868bca7499ea0f41bc43b.webp", "f135ea474f1320d13883e194685b4d8a.webp",
  "f3382b5fa7e14fcab30d4279f203c83a.webp", "f725eb23b6db39a55736f1428f6a76c5.webp"
];

// Function to get random avatars
const getRandomAvatars = (count) => {
  const shuffled = [...ALL_AVATARS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(filename => `/slider/avatars/${filename}`);
};

// JSON-конфиг слайдера
const heroSliderConfig = {
  slides: [
    {
      id: 1,
      videoSrc: "/slider/video1_1.mp4",
      autoplay: true,
      loop: true,
      muted: false,
      overlay: {
        leftText: {
          title: "Тысячи автомобилей ждут тебя",
          subtitle: "Участвуй в Live Auction!"
        },
        rightBlock: {
          carModel: "2022 Tesla Model 3",
          price: "$42,500",
          avatars: ["/slider/avatars/0450249b131eec36dc8333b7cf847bc4.webp", "/slider/avatars/06d29f74c2f85239efe3f9ade1b96da7.webp"],
          participantsCount: 23
        },
        animation: {
          exit: {
            leftText: "translateX(-100%)",
            rightBlock: "translateX(100%)",
            duration_ms: 800,
            timingFunction: "ease-in-out",
            textChangeAfterExit: true
          }
        },
        ctaButtons: [
          {
            text: "Join Live Auction",
            action: "openBidModal",
            modal: {
              question: "How much would you like to bid?",
              inputType: "number"
            }
          }
        ]
      }
    },
    {
      id: 2,
      videoSrc: "/slider/video1_2.mp4",
      autoplay: true,
      loop: true,
      muted: false,
      overlay: {
        leftText: {
          title: "Участвуй в торгах в реальном времени",
          subtitle: "Ставь, следи и выигрывай!"
        },
        rightBlock: {
          carModel: "2021 BMW X5 xDrive40i",
          price: "$67,500",
          avatars: ["/slider/avatars/098d5b19a0870d95bee0cdbcef632be1.webp", "/slider/avatars/112413f070536d15170606f2d00aa15d.webp"],
          participantsCount: 15
        },
        animation: {
          exit: {
            leftText: "translateX(-100%)",
            rightBlock: "translateX(100%)",
            duration_ms: 800,
            timingFunction: "ease-in-out",
            textChangeAfterExit: true
          }
        },
        ctaButtons: [
          {
            text: "Join Live Auction",
            action: "openBidModal",
            modal: {
              question: "How much would you like to bid?",
              inputType: "number"
            }
          }
        ]
      }
    },
    {
      id: 3,
      videoSrc: "/slider/video1_3.mp4",
      autoplay: true,
      loop: true,
      muted: false,
      overlay: {
        leftText: {
          title: "Найди свой идеальный автомобиль",
          subtitle: "По VIN, фильтруй и сортируй по своим приоритетам"
        },
        rightBlock: {
          carModel: "2020 Audi Q7",
          price: "$59,900",
          avatars: ["/slider/avatars/119d9abaee7a1e987571f0fe776bd1a5.webp", "/slider/avatars/1a270860bac2c66b434968a3047822e3.webp"],
          participantsCount: 12
        },
        animation: {
          exit: {
            leftText: "translateX(-100%)",
            rightBlock: "translateX(100%)",
            duration_ms: 800,
            timingFunction: "ease-in-out",
            textChangeAfterExit: true
          }
        },
        ctaButtons: [
          {
            text: "Join Live Auction",
            action: "openBidModal",
            modal: {
              question: "How much would you like to bid?",
              inputType: "number"
            }
          }
        ]
      }
    }
  ],
  navigationDots: {
    shape: "circular",
    position: "bottom center",
    interactive: true
  },
  videoControls: {
    enabled: true,
    muteUnmute: true,
    stopSlider: {
      enabled: true,
      maxHours: 24,
      modalQuestion: "На сколько часов отключить слайдер?"
    }
  },
  responsive: {
    desktop: {
      showOverlayText: true
    },
    mobile: {
      showOverlayText: true,
      stickyCTA: true
    }
  }
};



const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [targetSlide, setTargetSlide] = useState(0);
  const [videoErrors, setVideoErrors] = useState({});
  const [isVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(heroSliderConfig.slides[0].muted);
  const [textAnimating, setTextAnimating] = useState(false);
  const [textContent, setTextContent] = useState(heroSliderConfig.slides[0]);
  const [randomRightAvatars, setRandomRightAvatars] = useState(getRandomAvatars(3));

  // Performance optimization states
  const [preloadedVideos, setPreloadedVideos] = useState(new Set([0]));
  const [videoLoading, setVideoLoading] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  // Modal states
  const [bidModalVisible, setBidModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState(1);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [disableModalVisible, setDisableModalVisible] = useState(false);
  const [disableHours, setDisableHours] = useState(1);

  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const videoRefs = useRef({});
  const observerRef = useRef(null);

  // Предварительная загрузка аватаров для предотвращения мерцания
  useEffect(() => {
    const preloadAvatars = () => {
      ALL_AVATARS.forEach(filename => {
        const img = new Image();
        img.src = `/slider/avatars/${filename}`;
      });
    };

    preloadAvatars();
  }, []);

  // Video preloading function
  const preloadVideo = useCallback((slideIndex) => {
    if (preloadedVideos.has(slideIndex)) return;

    const slide = heroSliderConfig.slides[slideIndex];
    if (!slide) return;

    setVideoLoading(prev => ({ ...prev, [slideIndex]: true }));

    // Create a video element for preloading
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = slide.videoSrc;
    video.muted = true;

    video.onloadedmetadata = () => {
      setVideoLoading(prev => ({ ...prev, [slideIndex]: false }));
      setPreloadedVideos(prev => new Set([...prev, slideIndex]));
    };

    video.onerror = () => {
      setVideoLoading(prev => ({ ...prev, [slideIndex]: false }));
      setVideoErrors(prev => ({ ...prev, [slideIndex]: true }));
    };
  }, [preloadedVideos]);

  // Preload current and next video
  useEffect(() => {
    preloadVideo(currentSlide);
    const nextSlide = (currentSlide + 1) % heroSliderConfig.slides.length;
    preloadVideo(nextSlide);
  }, [currentSlide, preloadVideo]);

  // Intersection Observer for performance optimization
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Control video playback based on visibility and current slide
  useEffect(() => {
    heroSliderConfig.slides.forEach((slide, index) => {
      const videoElement = videoRefs.current[index];
      if (!videoElement) return;

      if (index === currentSlide && isVisible && isVideoPlaying) {
        // Play current video
        videoElement.play().catch(() => {
          // Silently handle play promise rejection
        });
      } else {
        // Pause inactive videos
        videoElement.pause();
      }
    });
  }, [currentSlide, isVisible, isVideoPlaying]);

  // Cleanup videos on unmount
  useEffect(() => {
    const currentVideos = videoRefs.current;
    return () => {
      Object.values(currentVideos).forEach(video => {
        if (video) {
          video.pause();
          video.src = '';
          video.load();
        }
      });
    };
  }, []);


  // Функция для обработки смены слайда с анимацией
  const handleSlideChange = useCallback((newSlideIndex) => {
    if (textAnimating || newSlideIndex === targetSlide) return; // Предотвращаем множественные анимации

    setTextAnimating(true); // Начинаем анимацию выхода

    const handleTransitionEnd = () => {
      // Удаляем обработчик события
      if (overlayRef.current) {
        overlayRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }
      if (cardRef.current) {
        cardRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }

      // Меняем контент после завершения анимации выхода
      setTextContent(heroSliderConfig.slides[newSlideIndex]);
      setRandomRightAvatars(getRandomAvatars(3)); // Generate new random avatars
      setTargetSlide(newSlideIndex);
      setTextAnimating(false); // Сбрасываем анимацию для входа
    };

    // Добавляем обработчики событий transitionend
    if (overlayRef.current) {
      overlayRef.current.addEventListener('transitionend', handleTransitionEnd);
    }
    if (cardRef.current) {
      cardRef.current.addEventListener('transitionend', handleTransitionEnd);
    }

    // Меняем видео слайд
    setCurrentSlide(newSlideIndex);
  }, [textAnimating, targetSlide]);

  // Use ref to avoid stale closure in useEffect
  const handleSlideChangeRef = useRef(handleSlideChange);
  handleSlideChangeRef.current = handleSlideChange;

  // Автопереключение слайдов
  useEffect(() => {
    if (!isVideoPlaying) return;

    const interval = setInterval(() => {
      const nextSlide = (targetSlide + 1) % heroSliderConfig.slides.length;
      handleSlideChangeRef.current(nextSlide);
    }, 5000); // Переключение каждые 5 секунд

    return () => clearInterval(interval);
  }, [isVideoPlaying, targetSlide]); // Use ref to avoid dependency on handleSlideChange

  // Функции управления видео
  const handleMuteUnmute = () => {
    setIsVideoMuted(!isVideoMuted);
  };


  // Обработчик клика по навигационной точке
  const handleDotClick = (index) => {
    handleSlideChange(index);
  };

  // Обработчики модальных окон
  const handleCtaButtonClick = (action) => {
    if (action === 'openBidModal') {
      setBidModalVisible(true);
    } else if (action === 'openDisableModal') {
      setDisableModalVisible(true);
    }
  };

  const handleBidConfirm = () => {
    console.log(`Пользователь сделал ставку: $${bidAmount}`);
    setBidModalVisible(false);
    setBidAmount(1);
  };

  const handleBidCancel = () => {
    setBidModalVisible(false);
    setBidAmount(1);
  };

  const handleInfoModalClose = () => {
    setInfoModalVisible(false);
  };

  const handleDisableSlider = () => {
    setDisableModalVisible(true);
  };

  const handleDisableConfirm = () => {
    console.log(`Слайдер отключен на ${disableHours} часов`);
    setDisableModalVisible(false);
    setDisableHours(1);
  };

  const handleDisableCancel = () => {
    setDisableModalVisible(false);
    setDisableHours(1);
  };

  // Обработчик ошибки загрузки видео
  const handleVideoError = (slideId) => {
    setVideoErrors(prev => ({
      ...prev,
      [slideId]: true
    }));
  };

  return (
    <div id="hero-slider-container" className="hero-slider-container" ref={containerRef}>
      <div className="hero-slider-wrapper">
        {/* Видео фон */}
        <div className="hero-video-background">
          {heroSliderConfig.slides.map((slide, index) => (
            <div key={slide.id} className="video-slide-container">
              {videoLoading[index] && (
                <div className="video-loading-overlay">
                  <Spin size="large" />
                </div>
              )}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={videoErrors[slide.id] ? '/slider/video1_1.mp4' : slide.videoSrc}
                className={`hero-video-slide ${index === currentSlide ? 'active' : ''}`}
                autoPlay={false} // Controlled by useEffect
                loop
                muted={isVideoMuted}
                playsInline
                preload={preloadedVideos.has(index) ? 'metadata' : 'none'}
                onError={() => handleVideoError(slide.id)}
                onLoadedData={() => {
                  // Video is ready, ensure it's in correct state
                  const video = videoRefs.current[index];
                  if (video && index === currentSlide && isVisible && isVideoPlaying) {
                    video.play().catch(() => {});
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* LIVE NOW Indicator */}
        <div className="live-now-indicator">
          <div className="live-dot-pulse"></div>
          <span className="live-text-indicator">LIVE NOW</span>
        </div>

        {/* Текстовый оверлей */}
        <div className="hero-overlay">
          {/* Левый блок текста */}
          <div ref={overlayRef} className={`overlay-left-text ${textAnimating ? 'exit-left' : ''}`}>
            <h1 className="overlay-title">
              <span className="highlight-text">{textContent.overlay.leftText.title.split(' ')[0]}</span>{' '}
              {textContent.overlay.leftText.title.split(' ').slice(1).join(' ')}
            </h1>
            <p className="overlay-subtitle">{textContent.overlay.leftText.subtitle}</p>

            {/* Left-side avatars - show all participants */}
            <div className="left-side-avatars">
              <div className="avatars-grid">
                {ALL_AVATARS.slice(0, 20).map((filename, index) => (
                  <Tooltip key={filename} title={`Participant ${index + 1}`}>
                    <Avatar
                      src={`/slider/avatars/${filename}`}
                      size="small"
                      className="grid-avatar"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        zIndex: 20
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          {/* Правый блок информации */}
          <div ref={cardRef} className={`overlay-right-block ${textAnimating ? 'exit-right' : ''}`}>
            {/* Информация об автомобиле */}
            <div className="car-info">
              <h3 className="car-model">{textContent.overlay.rightBlock.carModel}</h3>
              <div className="car-price">{textContent.overlay.rightBlock.price}</div>
            </div>

            {/* Right-side random avatars */}
            <div className="right-side-avatars">
              <div className="random-avatars-container">
                {randomRightAvatars.map((avatar, index) => (
                  <Tooltip key={avatar} title={`Random Participant ${index + 1}`}>
                    <Avatar
                      src={avatar}
                      size="large"
                      className="random-avatar"
                      style={{
                        animationDelay: `${index * 0.3}s`,
                        zIndex: 20
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </Tooltip>
                ))}
              </div>
              <span className="participants-count">
                +{textContent.overlay.rightBlock.participantsCount} участников
              </span>
            </div>


            {/* Кнопки CTA */}
            <div className="cta-buttons">
              {textContent.overlay.ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  type={index === 0 ? "primary" : "default"}
                  size="large"
                  className={index === 0 ? "cta-button-primary" : "cta-button-secondary"}
                  onClick={() => handleCtaButtonClick(button.action)}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Контролы видео */}
        {heroSliderConfig.videoControls.enabled && (
          <div className="video-controls">
            {heroSliderConfig.videoControls.muteUnmute && (
              <Button
                className="video-control-btn"
                icon={isVideoMuted ? <SoundOutlined /> : <SoundTwoTone />}
                onClick={handleMuteUnmute}
                title={isVideoMuted ? "Включить звук" : "Отключить звук"}
              />
            )}
            {heroSliderConfig.videoControls.stopSlider.enabled && (
              <Button
                className="video-control-btn"
                icon={<StopOutlined />}
                onClick={handleDisableSlider}
                title="Остановить слайдер"
              />
            )}
          </div>
        )}

        {/* Навигационные точки */}
        <div className="hero-navigation-dots">
          {heroSliderConfig.slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === targetSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>

        {/* Модальное окно для ставки */}
        <Modal
          title="Сделать ставку"
          open={bidModalVisible}
          onOk={handleBidConfirm}
          onCancel={handleBidCancel}
          okText="Подтвердить ставку"
          cancelText="Отмена"
          centered
        >
          <div style={{ padding: '20px 0' }}>
            <p>{textContent.overlay.ctaButtons.find(btn => btn.action === 'openBidModal')?.modal?.question || "Сколько хотите поставить?"}</p>
            <InputNumber
              min={1}
              value={bidAmount}
              onChange={setBidAmount}
              prefix="$"
              style={{ width: '100%' }}
              size="large"
            />
          </div>
        </Modal>

        {/* Модальное окно "How It Works" */}
        <Modal
          title="How It Works"
          open={infoModalVisible}
          onCancel={handleInfoModalClose}
          footer={null}
          centered
        >
          <div style={{ padding: '20px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '16px' }}>Как работает наш аукцион</h3>
            </div>
            <div style={{ lineHeight: '1.6' }}>
              <p><strong>1. Регистрация:</strong> Создайте аккаунт и подтвердите свою личность</p>
              <p><strong>2. Выбор автомобиля:</strong> Просматривайте каталог доступных автомобилей</p>
              <p><strong>3. Участие в торгах:</strong> Делайте ставки в режиме реального времени</p>
              <p><strong>4. Выигрыш:</strong> Если ваша ставка станет победной, свяжемся с вами</p>
              <p><strong>5. Оплата и доставка:</strong> Завершите сделку безопасно</p>
            </div>
          </div>
        </Modal>

        {/* Модальное окно для отключения слайдера */}
        <Modal
          title="Отключить слайдер"
          open={disableModalVisible}
          onOk={handleDisableConfirm}
          onCancel={handleDisableCancel}
          okText="Отключить"
          cancelText="Отмена"
          centered
        >
          <div style={{ padding: '20px 0' }}>
            <p>{heroSliderConfig.videoControls.stopSlider.modalQuestion}</p>
            <Select
              value={disableHours}
              onChange={setDisableHours}
              style={{ width: '100%' }}
              size="large"
            >
              <Select.Option value={1}>1 час</Select.Option>
              <Select.Option value={2}>2 часа</Select.Option>
              <Select.Option value={4}>4 часа</Select.Option>
              <Select.Option value={8}>8 часов</Select.Option>
              <Select.Option value={12}>12 часов</Select.Option>
              <Select.Option value={24}>24 часа</Select.Option>
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Hero;
