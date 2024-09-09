#include "RNWgpuViewSpec.h"

namespace facebook::react {

static facebook::jsi::Value __hostFunction_NativeWebGPUModuleSpecJSI_install(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, BooleanKind, "install", "()Z", args, count, cachedMethodId);
}

static facebook::jsi::Value __hostFunction_NativeWebGPUModuleSpecJSI_createSurfaceContext(facebook::jsi::Runtime& rt, TurboModule &turboModule, const facebook::jsi::Value* args, size_t count) {
  static jmethodID cachedMethodId = nullptr;
  return static_cast<JavaTurboModule &>(turboModule).invokeJavaMethod(rt, BooleanKind, "createSurfaceContext", "(D)Z", args, count, cachedMethodId);
}

NativeWebGPUModuleSpecJSI::NativeWebGPUModuleSpecJSI(const JavaTurboModule::InitParams &params)
  : JavaTurboModule(params) {
  methodMap_["install"] = MethodMetadata {0, __hostFunction_NativeWebGPUModuleSpecJSI_install};
  methodMap_["createSurfaceContext"] = MethodMetadata {1, __hostFunction_NativeWebGPUModuleSpecJSI_createSurfaceContext};
}

std::shared_ptr<TurboModule> RNWgpuViewSpec_ModuleProvider(const std::string &moduleName, const JavaTurboModule::InitParams &params) {
  if (moduleName == "WebGPUModule") {
    return std::make_shared<NativeWebGPUModuleSpecJSI>(params);
  }
  return nullptr;
}

} // namespace facebook::react
