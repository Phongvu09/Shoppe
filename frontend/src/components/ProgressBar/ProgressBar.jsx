import React from "react";
import { useLocation } from "react-router-dom";
import "./ProgressBar.css";

const ProgressBar = () => {
    const location = useLocation();
    const steps = [
        { path: "/seller/product/info", label: "Thông tin cơ bản" },
        { path: "/seller/product/detail", label: "Thông tin chi tiết" },
        { path: "/seller/product/sales", label: "Thông tin bán hàng" },
        { path: "/seller/product/review", label: "Xem lại" },
    ];

    const currentStepIndex = steps.findIndex((step) => location.pathname.startsWith(step.path));

    return (
        <div className="progress-bar">
            {steps.map((step, index) => (
                <div key={step.path} className="step-container">
                    <div
                        className={`step ${currentStepIndex === index ? "active" : ""} ${currentStepIndex > index ? "completed" : ""
                            }`}
                        onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
                        onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
                    >
                        {index + 1}
                    </div>
                    <span className="step-label">{step.label}</span>
                    {index < steps.length - 1 && <div className="connector" />}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;