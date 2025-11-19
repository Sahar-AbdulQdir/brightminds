import React from "react";
import { useSpring, animated, config } from "@react-spring/web";

const FloatingCard = ({ children, style }) => {
  // Floating animation (y oscillation + slight rotation)
  const float = useSpring({
    loop: true,
    to: [
      { y: -10, rotate: -2 },
      { y: 10, rotate: 2 },
    ],
    from: { y: 0, rotate: 0 },
    config: config.slow,
  });

  return (
    <animated.div
      style={{
        ...float,
        ...style,
        position: "absolute",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        background: "white",
        padding: "12px 20px",
        fontFamily: "Inter, sans-serif",
        willChange: "transform",
      }}
    >
      {children}
    </animated.div>
  );
};

const BHeroSection = () => {
  return (
    <section
      style={{
        position: "relative",
        background: "linear-gradient(45deg, #bf96d7ff 0%, #ffffff 50%, #f0c6f0ff 100%)",
        borderRadius: "16px",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Helvetica Neue, sans-serif",
        marginTop: "-2rem",
      }}
    >
      <div
        style={{
          maxWidth: "920px",
          width: "100%",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Floating Cards */}
        <FloatingCard style={{ top: "32px", left: "20px", width: "200px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="https://i.pravatar.cc/40?img=65"
              alt="Bonnie Miller"
              style={{ borderRadius: "50%", width: 40, height: 40 }}
            />
            <div>
              <div style={{ fontWeight: "700", fontSize: 14 }}>Bonnie Miller</div>
              <div style={{ fontSize: 12, color: "#555" }}>
                Started Wed 27 Oct, 2026
              </div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Week 6, Day 5</div>
              <div
                style={{
                  height: 4,
                  background: "#ddd",
                  borderRadius: 2,
                  marginTop: 4,
                }}
              >
                <div
                  style={{
                    width: "75%",
                    height: "100%",
                    background: "#111",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard style={{ top: "80px", right: "20px", width: "200px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="https://i.pravatar.cc/40?img=15"
              alt="Simon Phillips"
              style={{ borderRadius: "50%", width: 40, height: 40 }}
            />
            <div>
              <div style={{ fontWeight: "700", fontSize: 14 }}>Simon Phillips</div>
              <div style={{ fontSize: 12, color: "#555" }}>
                Started Wed 27 Oct, 2026
              </div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Week 8, Day 3</div>
              <div
                style={{
                  height: 4,
                  background: "#ddd",
                  borderRadius: 2,
                  marginTop: 4,
                }}
              >
                <div
                  style={{
                    width: "45%",
                    height: "100%",
                    background: "#111",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          style={{
            top: "140px",
            left: "calc(50% - 100px)",
            width: "220px",
            background: "#8869FF",
          }}
        >
          <div
            style={{
              color: "white",
              fontWeight: 600,
              borderRadius: "12px",
              padding: "12px 16px",
              boxShadow: "0 6px 12px rgba(136, 105, 255, 0.2)",
              fontSize: 14,
              lineHeight: 1.3,
            }}
          >
            <div style={{ fontWeight: "700", marginBottom: 8 }}>
              Appointment with
            </div>
            <div style={{ fontWeight: "700", fontSize: 16, marginBottom: 6 }}>
              Dr. Gary Elkins
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.3)",
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontSize: 12,
                }}
              >
                IBS
              </span>
              <span
                style={{
                  background: "rgba(255,255,255,0.3)",
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontSize: 12,
                }}
              >
                Sleep
              </span>
            </div>

            <div style={{ fontSize: 14 }}>
              <svg
                width="16"
                height="16"
                fill="white"
                style={{ verticalAlign: "middle", marginRight: 4 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M7 11h2v2H7zm6 0h2v2h-2zm-1-9c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8z" />
              </svg>
              12:00 PM, 7 Oct
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          style={{
            bottom: "60px",
            left: "20px",
            width: "180px",
            background: "#111",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="https://i.pravatar.cc/40?img=31"
              alt="Dr. Michael Yapko"
              style={{ borderRadius: "50%", width: 40, height: 40 }}
            />
            <div>
              <div style={{ fontWeight: "700", fontSize: 14 }}>
                Dr. Michael Yapko
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Psychologist</div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 4,
              right: 12,
              fontWeight: "900",
              fontSize: 24,
              opacity: 0.07,
            }}
          >
            ▶
          </div>
        </FloatingCard>

        <FloatingCard
          style={{
            bottom: "60px",
            right: "20px",
            width: "180px",
            background: "#8869FF",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="https://i.pravatar.cc/40?img=21"
              alt="Dr. Gary Elkins"
              style={{ borderRadius: "50%", width: 40, height: 40 }}
            />
            <div>
              <div style={{ fontWeight: "700", fontSize: 14 }}>
                Dr. Gary Elkins
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Professor</div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 4,
              right: 12,
              fontWeight: "900",
              fontSize: 24,
              opacity: 0.07,
            }}
          >
            ❯
          </div>
        </FloatingCard>

        {/* MAIN TEXT */}
        <h1
          style={{
            fontWeight: "900",
            fontSize: "3rem",
            marginBottom: "8px",
            color: "#111",
            userSelect: "none",
          }}
        >
          Mind Matters.
          <br />
          Empowering Mind
        </h1>

        <h2
          style={{
            fontWeight: "900",
            fontSize: "2rem",
            color: "#9c948d",
            marginBottom: "30px",
            userSelect: "none",
          }}
        >
          For IBS and Chronic
        </h2>

        <h1
          style={{
            fontWeight: "900",
            fontSize: "3rem",
            marginBottom: "24px",
            color: "#111",
            userSelect: "none",
          }}
        >
          To Heal Body
        </h1>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "480px",
            margin: "0 auto 36px",
            color: "#888",
            userSelect: "none",
          }}
        >
          Digital therapeutics for IBS and chronic conditions. Empowering the
          mind to heal the body.
        </p>

        {/* BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            style={{
              background: "white",
              borderRadius: "32px",
              padding: "10px 28px",
              fontWeight: 600,
              border: "1.5px solid #111",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 0 8px rgb(0 0 0 / 0.08)",
            }}
          >
            Learn More
          </button>

          <button
            style={{
              background: "#111",
              borderRadius: "32px",
              padding: "10px 28px",
              fontWeight: 600,
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 0 12px rgb(136 105 255 / 0.6)",
            }}
          >
            Get Started <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BHeroSection;
