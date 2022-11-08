<template>
        <div class="footer">
            <div class="footer-container">
                <div class="copyright">
                    <ul class="helpLink">
                        <li>关于我们
                            <span class="space"></span>
                        </li>
                        <li>联系我们
                            <span class="space"></span>
                        </li>
                        <li>商家入驻
                            <span class="space"></span>
                        </li>
                        <li>营销中心
                        </li>

                    </ul>
                    <p>姓名:许又文</p>
                    <p>学号:1190204165</p>
                </div>
            </div>
        </div>
</template>

<script>
export default {
name:'Footer'
}
</script>

<style scoped lang="less">
.footer {
    background-color: #eaeaea;
    .footer-container {
        width: 100%;
        margin: 0;
        .copyright {
            padding: 20px;

            .helpLink {
                text-align: center;
                li {
                    display: inline;
                    
                    .space {
                        border-left: 1px solid #666;
                        width: 1px;
                        height: 13px;
                        margin: 8px 10px;
                    }
                }
                
            }

            p {
                margin: 10px 0;
                text-align: center;
            }
        }
    }
}
</style>